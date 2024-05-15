import { auth, clerkClient } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  const { sessionClaims } = auth();

  const { sub } = sessionClaims;

  const { privateMetadata } = await clerkClient.users.getUser(sub);

  try {
    const accountSession = await stripe.accountSessions.create({
      account: privateMetadata.stripeConnectedAccount,
      components: {
        payments: {
          enabled: true,
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,

            destination_on_behalf_of_charge_management: false,
          },
        },
        balances: {
          enabled: true,
          features: {
            instant_payouts: true,
            standard_payouts: true,
            edit_payout_schedule: true,
          },
        },
        payouts: {
          enabled: true,
          features: {
            instant_payouts: true,
            standard_payouts: true,
          },
        },
      },
    });

    return Response.json({ client_secret: accountSession.client_secret });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account session",
      error
    );

    return new Response(500, { error: error.message });
  }
}
