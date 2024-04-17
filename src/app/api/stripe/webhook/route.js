import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(`Webhook Error: ${error.message}`);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log(
        `Checkout Session Async Failed: ${checkoutSessionAsyncPaymentFailed}`
      );
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log(
        `Checkout Session Async Failed: ${checkoutSessionAsyncPaymentSucceeded}`
      );
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      console.log(`Checkout Session Async Failed: ${checkoutSessionCompleted}`);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('{ "received": true }', { status: 200 });
}
