import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { prisma } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";

import stripe from "@/lib/stripe";

export async function POST(req) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { tickets, totalPrice, event } = await req.json();

  const headersList = headers();
  const origin = headersList.get("origin");

  if (!tickets || tickets.length === 0) {
    return new Response("Nenhum ingresso fornecido.", {
      status: 400,
    });
  }

  let orderItems = [];

  const ticketData = await Promise.all(
    tickets.map(async (ticket) => {
      const productData = await stripe.products.retrieve(ticket.stripeID);

      await orderItems.push({
        ticket: {
          connect: { id: ticket.id },
        },
        quantity: ticket.quantity,
      });
      return {
        price: productData.default_price,
        quantity: ticket.quantity,
      };
    })
  );

  let session;

  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      payment_method_options: {
        boleto: {
          expires_after_days: 3,
        },
      },
      tax_id_collection: {
        enabled: true,
      },
      phone_number_collection: {
        enabled: true,
      },
      customer_creation: "always",
      line_items: ticketData,
      mode: "payment",
      metadata: {
        userId: user.sub,
      },
      success_url: `${origin}/return?success=true`,
      cancel_url: `${origin}/return?canceled=true`,
    });
  } catch (err) {
    console.log("Error: ", err.message);
    return new Response(err.message, {
      status: err.statusCode || 500,
    });
  }
  console.log(session);
  const order = await prisma.order.create({
    data: {
      orderItems: {
        create: orderItems,
      },
      event: {
        connect: { id: event },
      },
      userId: user.id,
      total: totalPrice,
      paymentId: session.id,
      paymentStatus: session.payment_status,
    },
  });

  console.log("Order: ", order);

  return Response.json({ ...session });
}
