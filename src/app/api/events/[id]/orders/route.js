import { getUserDetails } from "@/lib/getUserDetails";
import { auth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  const { id } = params;

  const orders = await prisma.order.findMany({
    where: {
      eventId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
