import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = withApiAuthRequired(async (req) => {
  const res = new NextResponse();
  const { user } = await getSession(req, res);

  const tickets = await req.json();

  const headersList = headers();
  const origin = headersList.get("origin");

  if (!tickets || tickets.length === 0) {
    return new Response("Nenhum ingresso fornecido.", {
      status: 400,
    });
  }

  const ticketData = await Promise.all(
    tickets.map(async (ticket) => {
      const productData = await stripe.products.retrieve(ticket.stripeID);

      return {
        id: ticket.id,
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
      success_url: `${origin}/return?success=true`,
      cancel_url: `${origin}/return?canceled=true`,
    });
  } catch (err) {
    console.log(err.message);
    return new Response(err.message, {
      status: err.statusCode || 500,
    });
  }

  console.log(session);
  // await prisma.order.create({
  //   data: {
  //     // tickets: {
  //     //   connect: ticketData,
  //     // },
  //     userId: sub,
  //     orderItems: {
  //       create: ticketData,
  //     },
  //     paymentId: session.id,
  //     total: session.totalAmount,
  //   },
  // });

  return res.json({ ...session });
});
