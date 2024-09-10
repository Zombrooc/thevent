import { prisma } from "@/lib/database";
import { getUserDetails } from "@/lib/getUserDetails";

export async function GET(req, { params }) {
  const { orderId } = params;

  let query = {
    where: {
      id: orderId,
    },
    include: {
      orderItems,
    },
  };

  try {
    const order = await prisma.order.findMany(query);

    if (orders) {
      return Response.json({
        order,
      });
    }

    return Response.json({
      order: null,
    });
  } catch (e) {
    return new Response({
      status: e.statusCode,
      body: e.message,
    });
  }
}
