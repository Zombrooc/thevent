import { prisma } from "@/lib/database";
import { createStripeProduct } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      address: true,
      tags: true,
    },
  });

  if (events) {
    return Response.json({
      events: events,
    });
  }

  return Response.json({ events: [] });
}

export async function POST(req) {
  const { bannerImage, eventData, ticketsData, tagsData, addressData } =
    await req.json();

  console.log(eventData);

  const { userId } = auth();

  try {
    const sanitizedTickets = await Promise.all(
      ticketsData.map(async (ticket) => {
        const {
          ticketName,
          ticketPrice,
          ticketDescription,
          ticketStockAvailable,
          startEndingSelling,
          extraFields,
        } = ticket;

        const updatedTicketPrice =
          parseFloat(ticketPrice) +
          parseFloat(ticketPrice) * process.env.APP_FEE_PERCENT;

        const stripeID = await createStripeProduct(
          ticketName,
          updatedTicketPrice
        );

        return {
          ticketName,
          ticketPrice: parseFloat(updatedTicketPrice),
          ticketDescription,
          ticketStockAvailable: Number(ticketStockAvailable),
          ticketSubTotalPrice: parseFloat(ticketPrice),
          form: {
            create: {
              fields: extraFields,
            },
          },
          stripeID: stripeID,
          startSellingAt: startEndingSelling.from,
          endSellingAt: startEndingSelling.to,
        };
      })
    );

    const event = await prisma.event.create({
      data: {
        bannerImage,
        eventName: eventData.eventName,
        eventDescription: eventData.eventDescription,
        organizer: userId,
        eventDateStart: eventData.eventDateStartEnd.from,
        eventDateEnd: eventData.eventDateStartEnd.to,
        address: {
          create: addressData,
        },
        tickets: {
          create: sanitizedTickets,
        },
        tags: {
          create: tagsData,
        },
        analytics: {
          create: {
            pageViews: 0,
            avgRevenue: 0,
            sellQuantity: 0,
            soldTickets: 0,
            totalRevenue: 0,
          },
        },
      },
    });

    revalidatePath("/");
    redirect(`/event/${event.id}`);

    return Response.json({
      status: 200,
    });
  } catch (error) {
    throw error;
  }
}
