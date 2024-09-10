"use server";

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

  let orderItems = [];
  let appFee = 0;

  await Promise.all(
    tickets.map(async (ticket) => {
      const ticketDetails = await prisma.ticket.findUnique({
        where: { id: ticket.id },
      });

      const ticketFee =
        (parseFloat(ticketDetails.ticketPrice) -
          parseFloat(ticketDetails.ticketSubTotalPrice)) *
        Number(ticket.quantity);

      appFee += ticketFee;
      await orderItems.push({
        ticket: {
          connect: { id: ticket.id },
        },
        quantity: ticket.quantity,
      });
    })
  );

  const order = await prisma.order.create({
    data: {
      orderItems: {
        create: orderItems,
      },
      event: {
        connect: { id: eventId },
      },
      userId,
      total: totalPrice,
      subTotal: totalPrice - appFee,
      paymentStatus: "unpaid",
    },
  });

  redirect(`/event/${eventId}/confirm-purchase/${order.id}`);
};
