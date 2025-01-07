import { prisma } from "@/lib/prisma";
import { Redis } from "@upstash/redis";
import { getUserDetails } from "@/lib/getUserDetails";

import { auth } from "@clerk/nextjs/server";

const redis = Redis.fromEnv();

export async function POST(req) {
  const { eventID } = params;
  const orderContent = await req.json();

  const { userId } = await auth();

  if (!userId) {
    return Reponse.json({ message: "Unauthorized" }).status(401);
  }

  try {
    const order = await prisma.order.create({
      data: {
        ...orderContent,
      },
    });

    return Response.json({ orderID: order.id });
  } catch (err) {
    return new Response({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
}

export async function GET(req, { params }) {
  const { eventID } = await params;

  const searchParams = req.nextUrl.searchParams;

  const take = searchParams.get("take");

  let query = {
    where: {
      event: { id: eventID },
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  if (take) query.take = take;

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
