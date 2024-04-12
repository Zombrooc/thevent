"use server";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/database";
import { generateQR } from "@/lib/qrCode";
import { createStripeProduct } from "@/lib/stripe";

export const createEventAction = async (
  bannerImage,
  eventData,
  ticketsData,
  tagsData,
  addressData,
  user
) => {
  try {
    const sanitizedTickets = await Promise.all(
      ticketsData.map(async (ticket) => {
        const {
          ticketName,
          ticketPrice,
          ticketDescription,
          ticketStockAvailable,
          startEndingSelling,
        } = ticket;

        console.log(startEndingSelling);

        // Agora, createStripeProduct deve ser resolvido corretamente antes de prosseguir
        const stripeID = await createStripeProduct(ticketName, ticketPrice);

        const qrCodeURL = await generateQR(
          JSON.stringify({
            userId: user.sub,
          })
        );

        return {
          ticketName,
          ticketPrice: parseFloat(ticketPrice),
          ticketDescription,
          ticketStockAvailable: Number(ticketStockAvailable),
          qrCodeURL: qrCodeURL.toString(),
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
        organizer: user.sub,
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

    revalidatePath(`/event/${event.id}`);
    revalidatePath("/");
    redirect(`/event/${event.id}`);
  } catch (error) {
    throw error;
  }
};
