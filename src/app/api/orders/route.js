import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const orderContent = await req.json();

  // const { userId } = auth();

  // if (!userId) {
  //   return Response.json({ message: "Unauthorized" }).status(401);
  // }

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

export async function GET(req) {
  const orders = await prisma.order.findMany();

  return Response.json({ orders });
}
