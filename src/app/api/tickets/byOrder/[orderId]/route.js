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
        include: {
          ticket: {
            include: {
              form: true,
            },
          },
        },
      },
    },
  };

  try {
    const order = await prisma.order.findUnique(query);

    return Response.json({
      order,
    });
  } catch (e) {
    return new Response({
      status: e.statusCode,
      body: e.message,
    });
  }
}
