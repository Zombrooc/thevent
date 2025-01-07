'use server'

import { auth, clerkClient } from "@clerk/nextjs/server"

export const getAccountLink = async () => {

  const { sessionClaims } = await auth()

  const user = await clerkClient.users.getUser(sessionClaims.sub);

  return user.privateMetadata.stripeAccountLink
}