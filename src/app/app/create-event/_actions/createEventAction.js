"use server";

import { getUrl } from "@/lib/getUrl";
import { redirect } from "next/navigation";

export async function createEventAction(
  bannerImage,
  eventData,
  ticketsData,
  tagsData,
  addressData
) {
  // const { userId } = auth();

  try {
    const eventRes = await fetch(new URL(getUrl(`/api/events`)), {
      method: "POST",
      body: JSON.stringify({
        bannerImage,
        eventData,
        ticketsData,
        tagsData,
        addressData,
      }),
    });

    const data = await eventRes.json();
    if (data.eventURL) {
      redirect(data.eventURL);
    }
    //   const sanitizedTickets = await Promise.all(
    //     ticketsData.map(async (ticket) => {
    //       const {
    //         ticketName,
    //         ticketPrice,
    //         ticketDescription,
    //         ticketStockAvailable,
    //         startEndingSelling,
    //         extraFields,
    //       } = ticket;

    //       const updatedTicketPrice =
    //         parseFloat(ticketPrice) +
    //         parseFloat(ticketPrice) * process.env.APP_FEE_PERCENT;

    //       const ticketID = cuid();

    //       const stripeID = await createStripeProduct(
    //         ticketName,
    //         updatedTicketPrice,
    //         ticketPrice,
    //         ticketStockAvailable,
    //         ticketID
    //       );

    //       const multi = redis.multi();
    //       for (const ticket of ticketTypes) {
    //         multi.set(`ticket:${ticket.id}:stock`, ticketDefaultAvailableStock);
    //       }
    //       await multi.exec();

    //       let updatedTicketData = {
    //         id: ticketID,
    //         ticketName,
    //         ticketPrice: parseFloat(updatedTicketPrice),
    //         ticketDescription,
    //         ticketDefaultAvailableStock: Number(ticketStockAvailable),
    //         ticketSubTotalPrice: parseFloat(ticketPrice),
    //         stripeID: stripeID,
    //         startSellingAt: startEndingSelling.from,
    //         endSellingAt: startEndingSelling.to,
    //       };

    //       if (extraFields) {
    //         updatedTicketData.form = {
    //           create: {
    //             fields: extraFields,
    //           },
    //         };
    //       }

    //       return updatedTicketData;
    //     })
    //   );

    //   const event = await prisma.event.create({
    //     data: {
    //       bannerImage,
    //       eventName: eventData.eventName,
    //       eventDescription: eventData.eventDescription,
    //       organizer: userId,
    //       eventDateStart: eventData.eventDateStartEnd.from,
    //       eventDateEnd: eventData.eventDateStartEnd.to,
    //       address: {
    //         create: addressData,
    //       },
    //       tickets: {
    //         create: sanitizedTickets,
    //       },
    //       tags: {
    //         create: tagsData,
    //       },
    //     },
    //   });

    //   revalidatePath("/");
    //   redirect(`/event/${event.id}`);
  } catch (error) {
    throw error;
  }
}
