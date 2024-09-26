"use server";

import cuid from "cuid";
import { prisma } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const purchaseConfirmationAction = async ({
  tickets,
  totalPrice,
  eventId,
}) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!tickets || tickets.length === 0) {
    throw new Error("Nenhum ingresso fornecido.");
  }

  console.log(cuid());

  // let orderItems = [];
  // let appFee = 0;

  // // Fetch all ticket details in one query
  // const ticketIds = tickets.map((ticket) => ticket.id);
  // const ticketDetailsMap = await prisma.ticket
  //   .findMany({
  //     where: { id: { in: ticketIds } },
  //   })
  //   .then((details) => {
  //     return details.reduce((map, detail) => {
  //       map[detail.id] = detail;
  //       return map;
  //     }, {});
  //   });

  // // Calculate fees and prepare order items
  // tickets.forEach((ticket) => {
  //   const ticketDetails = ticketDetailsMap[ticket.id];

  //   if (ticketDetails) {
  //     const ticketFee =
  //       (parseFloat(ticketDetails.ticketPrice) -
  //         parseFloat(ticketDetails.ticketSubTotalPrice)) *
  //       Number(ticket.quantity);

  //     appFee += ticketFee;

  //     for (let n = 0; n < ticket.quantity; n++) {
  //       orderItems.push({
  //         ticket: {
  //           connect: { id: ticket.id },
  //         },
  //       });
  //     }
  //   }
  // });

  // const order = await prisma.order.create({
  //   data: {
  //     orderItems: {
  //       create: orderItems,
  //     },
  //     event: {
  //       connect: { id: eventId },
  //     },
  //     userId,
  //     total: totalPrice,
  //     subTotal: totalPrice - appFee,
  //     paymentStatus: "unpaid",
  //   },
  // });

  // redirect(`/event/${eventId}/confirm-purchase/${order.id}`);
};
