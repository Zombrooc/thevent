import { RESERVATION_STATUS } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { add } from "date-fns";
import cuid from "cuid";
// import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStripeProduct, normalizeStripePrice } from "@/lib/stripe";
import { qstashClient } from "@/lib/qstash";
import { Redis } from "@upstash/redis";
import { getCurrentStockFromDB } from "@/lib/actions/stockManager";

const redis = Redis.fromEnv();

export async function POST(req) {
  const { ticketCart, totalPrice, eventID } = await req.json();

  console.log("Ticket Cart: ", ticketCart);

  if (!ticketCart || ticketCart.length === 0) {
    throw new Error("Nenhum ingresso fornecido.");
  }

  // const currentStock = await Promise.all(
  //   ticketCart.map(({ id: ticketID }) => {
  //     return;
  //   })
  // );

  // console.log("Current Stock: ", currentStock);

  // await ticketCart.map(({ quantity }, index) => {
  //   if (currentStock[index].currentStock < quantity) {
  //     throw new Error("Estoque insuficiente");
  //   }
  // });

  let appFee = 0;

  let hasForms = false;

  const orderItemsCreationQueries = [];
  const reservationQueries = [];

  await Promise.all(
    ticketCart.map(async ({ id: ticketID, quantity }) => {
      const { currentStock } = getCurrentStockFromDB(ticketID);

      if (quantity > currentStock) {
        throw new Error(`Insufficient stock for ticket ${ticketID}`);
      }

      const forms = await redis.get(`ticket:${ticketID}:forms`);

      if (forms?.length > 0 && forms) {
        hasFormss = true;
      }

      const { ticketPrice, ticketSubTotalPrice } =
        await getStripeProduct(ticketID);

      const ticketFee =
        (normalizeStripePrice(parseFloat(ticketPrice)) -
          normalizeStripePrice(parseFloat(ticketSubTotalPrice))) *
        Number(quantity);

      appFee += ticketFee;

      for (let n = 0; n < quantity; n++) {
        orderItemsCreationQueries.push({
          ticket: { connect: { id: ticketID } },
        });

        reservationQueries.push({
          status: RESERVATION_STATUS.RESERVED,
          ticket: { connect: { id: ticketID } },
          expiresAt: add(new Date(), {
            minutes: 15,
          }),
        });
      }
    })
  );

  const orderContent = {
    orderItems: {
      create: orderItemsCreationQueries,
    },
    reservedTickets: {
      create: reservationQueries,
    },
    event: {
      connect: { id: eventID },
    },
    total: totalPrice,
    subTotal: totalPrice - appFee,
    paymentStatus: "unpaid",
  };

  console.log("Reservations: ", reservationQueries);
  console.log("Order Content: ", orderContent);

  const order = await prisma.order.create({
    data: orderContent,
  });

  if (hasForms && order) {
    redirect(`/event/${eventID}/confirm-purchase/${order.id}`);
  }

  if (order) {
    const response = await fetch(
      `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/stripe/checkout-sessions`,
      {
        method: "POST",
        body: JSON.stringify({ orderId: order.id }),
        // headers: { authorization: `Bearer ${await getToken()}` },
      }
    );

    const { url } = response.json();

    redirect(url);
  } else {
    throw new Error("Unable to create a new order");
  }
  // await qstashClient.publishJSON({
  //   url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/orders`,
  //   body: orderContent,
  // });

  // try {
  //   const order = await prisma.order.create({
  //     data: {
  //       ...orderContent,
  //     },
  //   });

  //   return Response.json({ orderID: order.id });
  // } catch (err) {
  //   return new Response({
  //     status: err.statusCode || 500,
  //     message: err.message,
  //   });
  // }
}

export async function GET(req) {
  const orders = await prisma.order.findMany();

  return Response.json({ orders });
}
