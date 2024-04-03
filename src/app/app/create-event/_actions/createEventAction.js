"use server";

import { prisma } from "@/lib/database";
import { redirect } from "next/navigation";

export const createEventAction = async (
  bannerImage,
  eventData,
  ticketsData,
  tagsData,
  addressData,
  user
) => {
  const sanitizedTickets = await ticketsData.map((ticket) => {
    const {
      ticketName,
      ticketPrice,
      ticketDescription,
      ticketStockAvailable,
      startEndingSelling,
    } = ticket;

    return {
      ticketName,
      ticketPrice,
      ticketDescription,
      ticketStockAvailable,
      startSellingAt: startEndingSelling.from,
      endSellingAt: startEndingSelling.to,
    };
  });

  try {
    const event = await prisma.event.create({
      data: {
        bannerImage,
        eventName: eventData.eventName,
        eventDescription: eventData.eventDescription,
        organizer: user.sid,
        eventDateStart: eventData.eventDateStartEnd.from,
        eventDateEnd: eventData.eventDateStartEnd.to,
        addresses: {
          create: addressData,
        },
        tags: {
          create: {
            assignedBy: user.sid,
            assignedAt: new Date(),
            tag: {
              createMany: tagsData,
            },
          },
        },
        tickets: {
          create: ticketsData,
        },
      },
    });
    await router.revalidate(`/event/${event.id}`);
    redirect(`/event/${event.id}`);
  } catch (error) {
    throw error;
  }
};
