/*
 * app/api/webhooks/billing/stripe/route.ts
 *
 *=================================================
 * Stripe Webhook Route.
 *=================================================
 * This route is used to handle Stripe Webhooks.
 * - https://stripe.com/docs/webhooks
 * @author gh/tego101
 * @version 1.0.0
 * @url https://github.com/tego101/nextjs-14-stripe-webhooks
 */
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const EventName = [
  // Checkout: https://stripe.com/docs/payments/checkout
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
  // Charge: https://stripe.com/docs/api/charges
  // "charge.succeeded",
  // "charge.failed",
  // "charge.refunded",
  // "charge.expired",
  // Disputes: https://stripe.com/docs/disputes
  // "charge.dispute.created",
  // "charge.dispute.updated",
  // "charge.dispute.funds_reinstated",
  // "charge.dispute.funds_withdrawn",
  // "charge.dispute.closed",
  // Customer: https://stripe.com/docs/api/customers
  // "customer.created",
  // "customer.updated",
  // "customer.deleted",
  // "customer.subscription.created",
  // "customer.subscription.updated",
  // "customer.subscription.deleted",
  // "customer.subscription.paused",
  // "customer.subscription.resumed",
];

async function handleStripeWebhook(body) {
  // const mode = body.data?.object?.mode;
  const id = body.data?.object?.id;
  // const obj = body.data?.object?.object;
  // const stat = body.data?.object?.status;
  const status = body.data?.object?.payment_status || body.data?.object?.paid;
  const payment_intent = body.data?.object?.payment_intent;
  // const subId = body.data?.object?.subscription;
  // const stripeInvoiceId = body.data?.object?.invoice;
  // const userId = body.data?.object?.metadata?.userId;
  const meta = body.data?.object?.metadata;
  // const stripe_invoice = body.data?.object?.invoice;
  const type = body.type;

  // console.log everything above REMOVE BEFORE PRODUCTION.
  // console.log("mode --->", mode);
  // console.log("webhook type --->", type);
  // console.log("id --->", id);
  // console.log("obj --->", obj);
  // console.log("stat --->", stat);
  // console.log("status --->", status);
  // console.log("payment_intent --->", payment_intent);
  // console.log("subId --->", subId);
  // console.log("stripeInvoiceId --->", stripeInvoiceId);
  // console.log("meta --->", meta);
  // console.log("stripe_invoice --->", stripe_invoice);

  // Switch on the event type.
  switch (type) {
    case "checkout.session.expired":
      return new Response(
        JSON.stringify({ message: "Payments marked canceled!" }),
        {
          status: 200,
        }
      );

    case "checkout.session.async_payment_succeeded":
      console.log("Payment Id", id);
      console.log("Event Id", meta.eventId);
      console.log("paymentStatus", status);
      console.log("Payment Id", id, " ", payment_intent);

      const order = await prisma.Order.update({
        where: {
          paymentId: id,
          eventId: meta.eventId,
        },
        data: {
          paymentStatus: status,
          paymentId: payment_intent,
        },
      });

      return new Response(JSON.stringify({ message: "Paiment success!" }), {
        status: 200,
      });

    case "checkout.session.completed":
      const { subTotal, orderItems } = await prisma.Order.findUnique({
        where: { paymentId: id },
        include: {
          orderItems: true,
        },
      });

      await prisma.Order.update({
        where: {
          paymentId: id,
        },
        data: {
          paymentStatus: status,
          paymentId: payment_intent,
        },
      });

      const { _avg } = await prisma.order.aggregate({
        where: {
          paymentStatus: "paid",
          eventId: meta.eventId,
        },
        _avg: {
          total: true,
        },
      });

      console.log(status);
      if (status === "paid") {
        let soldTickets = 0;

        await orderItems.map((orderItem) => {
          soldTickets += orderItem.quantity;
          return;
        });

        await prisma.analytics.update({
          where: {
            eventId: meta.eventId,
          },
          data: {
            totalRevenue: {
              increment: subTotal,
            },
            avgRevenue: _avg.total,
            soldTickets: { increment: soldTickets },
            sellQuantity: {
              increment: 1,
            },
          },
        });
      }

      return new Response(JSON.stringify({ message: "Checkout completed!" }), {
        status: 200,
      });

    default:
      return new Response(JSON.stringify({ error: "Invalid event type" }), {
        status: 400,
      });
  }
}

async function POST(request) {
  try {
    // Request Body.
    const rawBody = await request.text();

    let event;

    console.log("tá no POST");

    // Verify the webhook signature
    try {
      const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!stripeWebhookSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET not set");
      }

      const sig = request.headers.get("Stripe-Signature");
      if (!sig) {
        throw new Error("Stripe Signature missing");
      }

      // Assuming you have a Stripe instance configured
      event = Stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
    } catch (err) {
      console.error(`⚠️  Webhook signature verification failed.`, err.message);
      return new Response(
        JSON.stringify({ error: "Webhook signature verification failed" }),
        {
          status: 400,
        }
      );
    }

    const webhookResponse = await handleStripeWebhook(event); // Ensure handleStripeWebhook is properly implemented

    return new Response(webhookResponse?.body, {
      status: webhookResponse?.status || 200,
    });
  } catch (error) {
    console.error("Error in Stripe webhook handler:", error);
    return new Response(JSON.stringify({ error: "Webhook handler failed." }), {
      status: 500, // Changed to 500, indicating a server error
    });
  }
}

async function GET(request, response) {
  // Bad Request or how ever you want to respond.
  return new Response(JSON.stringify({ error: "Is here" }), {
    status: 400,
  });
}

export { POST, GET };
