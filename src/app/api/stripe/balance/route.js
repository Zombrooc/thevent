import { currentUser } from "@clerk/nextjs/server";

export async function GET() {

  const user = await currentUser()

  const balance = await stripe.balance.retrieve({
    stripeAccount: user.privateMetadata.stripeConnectedAccount
    
  });

  return balance
}