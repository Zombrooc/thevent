import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { clerkClient } from "@/lib/clerkClient";
import { prisma } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  const { orderId } = await req.json();
  console.log("API Order ID: ", orderId);

  const { userId, sessionClaims } = auth();
  if (!userId || !sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!orderId) {
    return new Response("No Order Passed", { status: 400 });
  }

  const { orderItems, event, total, subTotal } = await prisma.Order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          ticket: true,
        },
      },
      event: true,
    },
  });

  const customer = await clerkClient.users.getUser(userId);

  const eventDetails = await prisma.event.findUnique({
    where: { id: event.id },
  });
  const eventProducerDetails = await clerkClient.users.getUser(
    eventDetails.organizer
  );

  const headersList = headers();
  const origin = headersList.get("origin");

  // if (!tickets || tickets.length === 0) {
  //   return new Response("Nenhum ingresso fornecido.", {
  //     status: 400,
  //   });
  // }

  // let orderItems = [];

  let appFee = total - subTotal;

  const ticketData = await Promise.all(
    orderItems.map(async (orderItem) => {
      console.log(orderItem);
      const { default_price } = await stripe.products.retrieve(
        orderItem.ticket.stripeID
      );
      return {
        price: default_price,
        quantity: 1,
      };
    })
  );

  let session;

  try {
    session = await stripe.checkout.sessions.create({
      // payment_method_types: ["card"],
      // payment_method_options: {
      //   boleto: {
      //     expires_after_days: 3,
      //   },
      // },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        eventID: event.id,
        orderID: orderId,
        userID: userId,
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

  return Response.json({ ...session });
}
