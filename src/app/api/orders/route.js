import { RESERVATION_STATUS } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { add } from "date-fns";
import cuid from "cuid";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStripeProduct, normalizeStripePrice } from "@/lib/stripe";
import { qstashClient } from "@/lib/qstash";
import { Redis } from "@upstash/redis";
import { getCurrentStockFromDB } from "@/lib/actions/stockManager";
import { getUrl } from "@/lib/getUrl";
import { getUserDetails } from "@/lib/getUserDetails";

const redis = Redis.fromEnv();

export async function POST(req) {
  const { ticketCart, totalPrice, eventID } = await req.json();

  const { userId, getToken } = await auth();

  if (!ticketCart || ticketCart.length === 0) {
    throw new Error("Nenhum ingresso fornecido.");
  }

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
        hasForms = true;
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
    userId: userId,
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
    return Response.json({
      success: true,
      url: new URL(getUrl(`/event/${eventID}/confirm-purchase/${order.id}`)),
    });
  }

  if (order) {
    const response = await fetch(
      new URL(getUrl(`/api/stripe/checkout-sessions`)),
      {
        method: "POST",
        body: JSON.stringify({ orderId: order.id }),
        headers: { authorization: `Bearer ${await getToken()}` },
      }
    );

    const { url } = await response.json();

    return Response.json({
      success: true,
      url,
    });
  } else {
    throw new Error("Unable to create a new order");
  }
  // await qstashClient.publishJSON({
  //   url: `${process.env.NEXT_PUBLIC_APP_URL}/api/orders`,
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
  const searchParams = req.nextUrl.searchParams;

  const take = searchParams.get("take");
  const eventID = searchParams.get("eventID");

  let query = {
    orderBy: {
      createdAt: "desc",
    },
  };

  if (eventID) query.where.event = { id: eventID };
  if (take) query.take = take;

  console.log("Query: ", query);

  try {
    const orders = await prisma.order.findMany(query);

    console.log("Orders: ", orders);

    if (orders.length > 0) {
      const updatedOrderWithUserDetails = await Promise.all(
        orders.map(async (order) => {
          const userDetails = await getUserDetails(order?.userId);

          return {
            ...order,
            user: {
              ...userDetails,
            },
          };
        })
      );

      return Response.json({
        orders: updatedOrderWithUserDetails,
      });
    }

    return Response.json({
      orders: [],
    });
  } catch (e) {
    console.error(e);
    return new Response({
      status: e.statusCode,
      body: e.message,
    });
  }
}
