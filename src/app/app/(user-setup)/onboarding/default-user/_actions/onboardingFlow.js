"use server";

import { createStripeCustomer } from "@/lib/stripe";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const onboardingFlow = async () => {
  const { sessionClaims } = await auth();

  const { sub, email, fullName } = sessionClaims;

  try {
    const customer = await createStripeCustomer(email, fullName);

    await clerkClient.users.updateUserMetadata(sub, {
      privateMetadata: {
        stripeId: customer.id,
      },
      publicMetadata: {
        onboardingComplete: true,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }

  redirect(`${process.env.VERCEL_PROJECT_PRODUCTION_URL}/`);
};
