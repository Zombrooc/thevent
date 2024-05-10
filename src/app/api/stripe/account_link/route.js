import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  const { account } = await req.json();
  try {
    const accountLink = await stripe.accountLinks.create({
      account: account,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/onboarding/events-producer/refresh/${account}`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/onboarding/events-producer/return/${account}`,
      type: "account_onboarding",
    });

    return Response.json({
      url: accountLink.url,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account link:",
      error
    );

    return Response.json({ error: error.message });
  }
}
