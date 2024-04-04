"use server";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/database";
import { generateQR } from "@/lib/qrCode";

export const createEventAction = async (
  bannerImage,
  eventData,
  ticketsData,
  tagsData,
  addressData,
  user
) => {
  const sanitizedTickets = ticketsData.map((ticket) => {
    const {
      ticketName,
      ticketPrice,
      ticketDescription,
      ticketStockAvailable,
      startEndingSelling,
    } = ticket;

    const qrCodeURL = generateQR(
      JSON.stringify({
        userId: user.sid,
      })
    );

    return {
      ticketName,
      ticketPrice: parseFloat(ticketPrice),
      ticketDescription,
      ticketStockAvailable: Number(ticketStockAvailable),
      qrCodeURL: qrCodeURL.toString(),
      startSellingAt: startEndingSelling.from,
      endSellingAt: startEndingSelling.to,
    };
  });

  const tagIds = await Promise.all(
    tagsData.map(async ({ tag }) => {
      let existingTag = await prisma.tags.findUnique({
        where: { tag: tag },
      });
      if (!existingTag) {
        existingTag = await prisma.tags.create({
          data: { tag: tag },
        });
      }
      return existingTag.id;
    })
  );

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
        tickets: {
          create: sanitizedTickets,
        },
      },
    });

    await Promise.all(
      tagIds.map((tagId) => {
        return prisma.tagsOnEvents.create({
          data: {
            eventId: event.id,
            tagId: tagId,
            assignedBy: user.sid, // Ajuste conforme necessário
          },
        });
      })
    );

    revalidatePath(`/event/${event.id}`);
    revalidatePath("/");
    redirect(`/event/${event.id}`);
  } catch (error) {
    throw error;
  }
};
