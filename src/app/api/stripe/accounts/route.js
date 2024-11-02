import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { auth, clerkClient } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  const { sessionClaims } = await auth();

  const user = await clerkClient.users.getUser(sessionClaims.sub);

  let account;
  try {
    if (user?.privateMetadata?.stripeConnectedAccount) {
      account = await stripe.accounts.retrieve(
        user?.privateMetadata?.stripeConnectedAccount
      );
    } else {
      account = await stripe.accounts.create({
        country: "BR",
        email: user.email,
        type: "express",
      });

      await clerkClient.users.updateUserMetadata(sessionClaims.sub, {
        privateMetadata: {
          stripeConnectedAccount: account.id,
        },
      });
    }

    return Response.json({ account: account.id });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
    return Response.json({ error: error.message });
  }
}
