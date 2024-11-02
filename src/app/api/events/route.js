import { prisma } from "@/lib/prisma";
import { createStripeProduct } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";
import cuid from "cuid";

const redis = Redis.fromEnv();

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

  if (!events) {
    return Response.json({ events: [] });
  }

  return Response.json({
    events,
  });
}

export async function POST(req) {
  const { bannerImage, eventData, ticketsData, tagsData, addressData } =
    await req.json();

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const multi = redis.multi();

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

        const ticketID = cuid();

        const stripeID = await createStripeProduct(
          ticketName,
          updatedTicketPrice,
          ticketPrice,
          ticketStockAvailable,
          ticketID
        );

        let updatedTicketData = {
          id: ticketID,
          ticketName,
          ticketPrice: parseFloat(updatedTicketPrice),
          ticketDescription,
          ticketDefaultAvailableStock: Number(ticketStockAvailable),
          ticketSubTotalPrice: parseFloat(ticketPrice),
          stripeID,
          startSellingAt: startEndingSelling.from,
          endSellingAt: startEndingSelling.to,
        };

        multi.set(`ticket:${ticketID}:available`, ticketStockAvailable);

        if (extraFields) {
          multi.set(`ticket:${ticketID}:forms`, extraFields);
          updatedTicketData.form = {
            create: {
              fields: extraFields,
            },
          };
        }

        return updatedTicketData;
      })
    );

    await multi.exec();

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
      },
    });

    return Response.json({
      eventURL: `${process.env.NEXT_PUBLIC_APP_URL}/event/${event.id}`,
    });
  } catch (error) {
    throw error;
  }
}
