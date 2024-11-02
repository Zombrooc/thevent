import { prisma } from "@/lib/prisma";

export async function GET(req, props) {
  const params = await props.params;
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
