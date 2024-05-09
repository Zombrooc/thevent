import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { prisma } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const { account } = req.body;

    const accountLink = await stripe.accountLinks.create({
      account: account,
      refresh_url: `${req.headers.origin}/refresh/${account}`,
      return_url: `${req.headers.origin}/return/${account}`,
      type: "account_onboarding",
    });

    res.json({
      url: accountLink.url,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account link:",
      error
    );
    res.status(500);
    res.send({ error: error.message });
  }
}
