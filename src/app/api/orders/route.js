import { prisma } from "@/lib/database";
import { getUserDetails } from "@/lib/getUserDetails";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const isDashboardHome = searchParams.get("isDashboardHome");

  let query = {
    where: {
      event: { id: id },
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

    const updatedOrderWithUserDetails = await Promise.all(
      orders.map(async (order) => {
        // const userDetails = await clerkClient.users.getUser(order?.userId);
        const userDetails = await getUserDetails(order?.userId);

        return {
          ...order,
          user: {
            ...userDetails,
          },
        };
      })
    );

    return {
      orders: updatedOrderWithUserDetails,
    };
  } catch (e) {
    throw new Error(e);
  }
}
