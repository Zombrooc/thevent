import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { prisma } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const account = await stripe.accounts.create({});

    res.json({ account: account.id });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
    res.status(500);
    res.json({ error: error.message });
  }
}
