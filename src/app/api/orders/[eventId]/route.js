import { prisma } from "@/lib/database";
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

      return Response.json(updatedOrderWithUserDetails);
    }

    return {
      orders: [],
    };
  } catch (e) {
    throw new Error(e);
  }
}
