"use server";

import { createStripeCustomer } from "@/lib/stripe";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const onboardingFlow = async () => {
  const { sessionClaims } = auth();
  try {
    const customer = await createStripeCustomer(
      sessionClaims.email,
      sessionClaims.fullName
    );

    await clerkClient.users.updateUserMetadata(sessionClaims.sub, {
      privateMetadata: {
        stripeId: customer.id,
      },
    });

    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
  } catch (e) {
    throw new Error(e);
  }
};
