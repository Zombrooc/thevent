import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req) {
  const { eventID } = params;
  const orderContent = await req.json();

  const { userId } = auth();

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
