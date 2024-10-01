"use server";

import cuid from "cuid";
import { prisma } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getStripeProductsByIDArrays,
  normalizeStripePrice,
} from "@/lib/stripe";
import { qstashClient } from "@/lib/qstash";

const redis = Redis.fromEnv();

export const purchaseConfirmationAction = async ({
  ticketCart,
  totalPrice,
  eventId,
}) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!ticketCart || ticketCart.length === 0) {
    throw new Error("Nenhum ingresso fornecido.");
  }

  console.log(cuid());

  let orderItems = [];
  let appFee = 0;

  // Fetch all ticket details in one query

  const stripeTicketIDs = ticketCart.map(({ stripeID }) => stripeID);

  const tickets = await getStripeProductsByIDArrays(stripeTicketIDs);

  console.log(tickets);

  const orderId = cuid();

  let reservationIds = [];

  // // Calculate fees and prepare order items
  tickets.forEach((ticket) => {
    if (ticket) {
      const ticketFee =
        (normalizeStripePrice(parseFloat(ticket.ticketPrice)) -
          normalizeStripePrice(parseFloat(ticket.ticketSubTotalPrice))) *
        Number(ticket.quantity);

      appFee += ticketFee;

      for (let n = 0; n < ticket.quantity; n++) {
        const reservationID = cuid();
        const reservationKey = `reservation:${eventId}:${userId}`;

        redis.set(
          reservationKey,
          {
            reservationID,
            status: "RESERVED",
            ticketID: ticket.id,
            orderID: orderId,
          },
          {
            ex: 60 * 15,
          }
        );

        orderItems.push({
          ticket: {
            connect: { id: ticket.id },
          },
        });
      }
    }
  });

  const result = await qstashClient.enqueueJSON({
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    body: {
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

  // return NextResponse.json({
  //   message: "Image queued for processing!",
  //   qstashMessageId: result.messageId,
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

  redirect(`/event/${eventId}/confirm-purchase/${order.id}`);
};
