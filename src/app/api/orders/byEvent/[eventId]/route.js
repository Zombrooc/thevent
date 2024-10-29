import { prisma } from "@/lib/prisma";
import { getUserDetails } from "@/lib/getUserDetails";

export async function GET(req, { params }) {
  const { eventId } = params;
  const searchParams = req.nextUrl.searchParams;
  const isDashboardHome = searchParams.get("isDashboardHome");

  let query = {
    where: {
      event: { id: eventId },
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  if (isDashboardHome) {
    query.take = 5;
  }

  try {
    const orders = await prisma.order.findMany(query);

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
    return new Response({
      status: e.statusCode,
      body: e.message,
    });
  }
}
