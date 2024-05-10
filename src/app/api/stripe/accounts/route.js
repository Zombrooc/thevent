import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { prisma } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  const user = await currentUser();

  try {
    const account = await stripe.accounts.create({
      country: "BR",
      email: user.email,
    });

    return Response.json({ account: account.id });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
    return Response.json({ error: error.message });
  }
}
