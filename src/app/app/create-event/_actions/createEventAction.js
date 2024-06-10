"use server";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/database";
// import { generateQR } from "@/lib/qrCode";
import { createStripeProduct } from "@/lib/stripe";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createEventAction(
  bannerImage,
  eventData,
  ticketsData,
  tagsData,
  addressData
) {
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
          ticketExtraFields,
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
          // qrCodeURL: qrCodeURL.toString(),
          Forms: json.Stringfy(ticketExtraFields),
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
  } catch (error) {
    throw error;
  }
}
