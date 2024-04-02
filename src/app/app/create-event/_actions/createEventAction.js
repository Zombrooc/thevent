"use server";

import { prisma } from "@/lib/database";

export const createEventAction = async (
  bannerImage,
  eventData,
  ticketsData,
  tagsData,
  addressData,
  user
) => {
  // const newTicketList = await ticketsData.map((ticket) => {
  //   const {
  //     ticketName,
  //     ticketPrice,
  //     ticketDescription,
  //     ticketStockAvailable,
  //     startEndingSelling,
  //   } = ticket;

  //   return {
  //     ticketName,
  //     ticketPrice,
  //     ticketDescription,
  //     ticketStockAvailable,
  //     startSellingAt: startEndingSelling.from,
  //     endSellingAt: startEndingSelling.to,
  //   };
  // });

  try {
    return;
    // const tickets = await prisma.ticket.createMany({
    //   data: newTicketList,
    //   skipDuplicates: true, // Skip 'Bobo'
    // });

    // const tags = await prisma.tags.createMany({
    //   data: tagsData,
    // });

    // const address = await prisma.address.create({
    //   data: addressData,
    // });

    // const event = await prisma.event.create({
    //   data: {
    //     bannerImage,
    //     eventName: eventData.eventName,
    //     eventDescription: eventData.eventDescription,
    //     organizer: user.id,
    //     tagsId: tags.id,
    //     tickets: tickets.id,
    //     eventDateStart: eventData.eventDateStartEnd.from,
    //     eventDateEnd: eventData.eventDateStartEnd.to,
    //     addressId: address.id,
    //   },
    // });

    // router.push(`/evento/${event.id}`);
    // await router.revalidate(`/evento/${event.id}`);
  } catch (error) {
    throw error;
  }
};
