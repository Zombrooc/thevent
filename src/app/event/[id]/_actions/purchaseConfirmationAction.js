"use server";

import cuid from "cuid";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStripeProduct, normalizeStripePrice } from "@/lib/stripe";
import { qstashClient } from "@/lib/qstash";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const purchaseConfirmationAction = async ({
  ticketCart,
  totalPrice,
  eventID,
}) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!ticketCart || ticketCart.length === 0) {
    throw new Error("Nenhum ingresso fornecido.");
  }

  const getCurrentStock = redis.multi();

  ticketCart.forEach(({ id: ticketID }) => {
    getCurrentStock.get(`ticket:${ticketID}:available`);
  });

  const currentStock = await getCurrentStock.exec();

  for (let i = 0; i < currentStock.length; i++) {
    const availableQuantity = parseInt(currentStock[i], 10);
    if (availableQuantity < ticketCart[i].quantity) {
      throw new Error(`Insufficient stock for ticket ${ticketCart[i].id}`);
    }
  }

  let orderItemsCreationQuery = [];
  let appFee = 0;

  const orderId = cuid();

  // const reservationId = `reservation:${Date.now()}:${Math.random().toString(36).substring(2, 15)}`

  // reserveMulti.expire(reservationId, 900) // 15 minutos de expiração

  // await reserveMulti.exec()

  // await tickets.map(ticket => {
  //   redisReservationFlow.set(`reservation:${ticket.id}`, {
  //     quantity: ticket.quantity,
  //   })
  // })

  // // Calculate fees, prepare order items and reserve tickets3
  const redisReservationFlow = redis.multi();

  let orderItems = [];
  await Promise.all(
    ticketCart.map(async (ticket, i) => {
      const { ticketPrice, ticketSubTotalPrice } = await getStripeProduct(
        ticket.id
      );

      const availableQuantity = redis.get(`ticket:${ticket.id}:available`);

      if (ticket.quantity > availableQuantity) {
        throw new Error(`${ticket.id} is out of stock`);
      }

      redisReservationFlow.set(
        `reservation:${ticket.id}:${userId}`,
        parseInt(ticket.quantity),
        {
          nx: true,
          ex: 60 * 15, //15 minutos expiration
        }
      );

      const ticketFee =
        (normalizeStripePrice(parseFloat(ticketPrice)) -
          normalizeStripePrice(parseFloat(ticketSubTotalPrice))) *
        Number(ticket.quantity);

      appFee += ticketFee;

      for (let n = 0; n < ticket.quantity; n++) {
        const orderItemID = cuid();
        orderItemsCreationQuery.push({
          id: orderItemID,
          ticket: {
            connect: { id: ticket.id },
          },
        });

        orderItems.push({
          id: orderItemID,
          ticketID: ticket.id,
          ticketName: ticket.ticketName,
        });
      }
    })
  );

  await redisReservationFlow.exec();

  const orderContent = {
    id: orderId,
    orderItems: {
      create: orderItemsCreationQuery,
    },
    event: {
      connect: { id: eventID },
    },
    userId,
    total: totalPrice,
    subTotal: totalPrice - appFee,
    paymentStatus: "unpaid",
  };

  await qstashClient.publishJSON({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/api/orders`,
    body: orderContent,
  });

  console.log("Ticket Cart", ticketCart);

  await redis.set(`order:${orderId}`, {
    orderItems,
    userId,
    total: totalPrice,
    subTotal: totalPrice - appFee,
  });

  redirect(`/event/${eventID}/confirm-purchase/${orderId}`);
};
