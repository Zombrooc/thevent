import { prisma } from "@/lib/prisma";

export async function PATCH(req) {
  const { userAnswers, orderItems } = await req.json();

  if (!orderItems || !userAnswers) {
    return new Response("Missing Arguments", {
      status: 422,
    });
  }

  const updates = await orderItems
    .filter(({ forms }) => (forms ? true : false))
    .map(({ id }) =>
      prisma.orderItem.update({
        where: {
          id,
        },
        data: {
          userAnswers: userAnswers.id,
        },
      })
    );

  console.log("Updates: ", updates);

  try {
    const results = await prisma.$transaction(updates);

    console.log("Result: ", results);
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
