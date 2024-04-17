import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

<<<<<<< HEAD
export async function POST(req) {
  const { user } = await getSession({ req });
=======
export const POST = withApiAuthRequired(async (req) => {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
>>>>>>> 0b4e53ad89929980a125ead7fc3ec5d956c33f2e

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

  console.log(ticketData);

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
    console.log("Error: ", err.message);
    return new Response(err.message, {
      status: err.statusCode || 500,
    });
  }

<<<<<<< HEAD
  console.log(orderItems);
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
=======
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
>>>>>>> 0b4e53ad89929980a125ead7fc3ec5d956c33f2e
