import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { clerkClient } from "@/lib/clerkClient";
import { prisma } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";

import { stripe } from "@/app/services/stripe

export async function POST(req) {
  const { tickets, totalPrice, event } = await req.json();

  const { userId, sessionClaims } = auth();

  const customer = await clerkClient.users.getUser(userId);

  const user = await clerkClient.users.getUser(sessionClaims.sub);

  const eventDetails = await prisma.event.findUnique({ where: { id: event } });

  const eventProducerDetails = await clerkClient.users.getUser(
    eventDetails.organizer
  );

  if (!user || !sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const headersList = headers();
  const origin = headersList.get("origin");

  if (!tickets || tickets.length === 0) {
    return new Response("Nenhum ingresso fornecido.", {
      status: 400,
    });
  }

  let orderItems = [];

  let appFee = 0;

  const ticketData = await Promise.all(
    tickets.map(async (ticket) => {
      const productData = await stripe.products.retrieve(ticket.stripeID);

      const ticketDetails = await prisma.ticket.findUnique({
        where: { id: ticket.id },
      });

      const ticketFee =
        (parseFloat(ticketDetails.ticketPrice) -
          parseFloat(ticketDetails.ticketSubTotalPrice)) *
        Number(ticket.quantity);

      appFee += ticketFee;

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
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        eventId: event,
      },

      line_items: ticketData,
      mode: "payment",

      payment_intent_data: {
        application_fee_amount: Math.floor(appFee * 100),
        on_behalf_of:
          eventProducerDetails.privateMetadata.stripeConnectedAccount,
        transfer_data: {
          destination:
            eventProducerDetails.privateMetadata.stripeConnectedAccount,
        },
      },
      customer: customer.privateMetadata.stripeId,
      success_url: `${origin}/return?success=true`,
      cancel_url: `${origin}/return?canceled=true`,
    });
  } catch (err) {
    console.log("Error: ", err.message);
    return new Response(err.message, {
      status: err.statusCode || 500,
    });
  }

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
      subTotal: totalPrice - appFee,
      paymentId: session.id,
      paymentStatus: session.payment_status,
    },
  });

  return Response.json({ ...session });
}
