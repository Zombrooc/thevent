import { prisma } from "@/lib/database";

export async function GET(req, { params }) {
  const { orderId } = params;

  let query = {
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: { ticket: { select: { id: true, ticketName: true } } },
      },
    },
  };

  try {
    const order = await prisma.order.findUnique(query);

    if (order) {
      return Response.json(order);
    }

    return Response.json({
      error: "Order not found",
    }).status(404);
  } catch (e) {
    return new Response({
      status: e.statusCode,
      body: e.message,
    });
  }
}
