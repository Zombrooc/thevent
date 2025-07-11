import { headers } from "next/headers";
// import { getSession } from "@auth0/nextjs-auth0";

import { stripe } from "@/lib/stripe";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getUrl } from "@/lib/getUrl";

export async function POST(req) {
  const { account } = await req.json();
  const { sessionClaims } = await auth();
  try {
    const accountLink = await stripe.accountLinks.create({
      account: account,
      refresh_url: new URL(
        getUrl(`/app/onboarding/events-producer/refresh/${account}`)
      ),
      return_url: new URL(
        getUrl(`/app/onboarding/events-producer/return/${account}`)
      ),
      type: "account_onboarding",
    });

    await clerkClient.users.updateUserMetadata(sessionClaims.sub, {
      privateMetadata: {
        stripeAccountLink: accountLink.url,
      },
      publicMetadata: {
        eventProducerOnBoardingFlowCompleted: true,
      },
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
