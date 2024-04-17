import { headers } from "next/headers";
import { getSession } from "@auth0/nextjs-auth0";

import prisma from "@/lib/database";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { user } = await getSession({ req });

  const { tickets, totalPrice } = await req.json();

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

  console.log(ticketData);

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
      success_url: `${origin}/return?success=true`,
      cancel_url: `${origin}/return?canceled=true`,
    });
  } catch (err) {
    console.log("Error: ", err.message);
    return new Response(err.message, {
      status: err.statusCode || 500,
    });
  }

  const Order = await prisma.order.create({
    data: {
      orderItems: {
        create: orderItems,
      },
      userId: user.sub,
      total: totalPrice,
      paymentId: session.id,
      paymentStatus: session.payment_status,
    },
  });

  return Response.json({ ...session });
}
