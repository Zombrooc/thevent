import { prisma } from "@/lib/database";

export async function PATCH(req) {
  const { orderItems, userAnswers } = await req.json();

  if (!orderItems || !userAnswers) {
    return new Response("Missing Arguments", {
      status: 422,
    });
  }

  const updates = await orderItems.map(({ id }) => {
    return prisma.orderItem.update({
      where: {
        id,
      },
      data: {
        userAnswers: userAnswers[id],
      },
    });
  });

  try {
    const results = await prisma.$transaction(updates);

    if (results) {
      return Response.json(
        { done: true },
        {
          status: 200,
        }
      );
    }
  } catch (e) {
    return new Response(e.message, {
      status: e.statusCode || 500,
    });
  }
}
