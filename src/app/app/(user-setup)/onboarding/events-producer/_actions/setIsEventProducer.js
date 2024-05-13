"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const setIsEventProducer = async (url) => {
  const { sessionClaims } = await auth();

  const { sub } = sessionClaims;

  await clerkClient.users.updateUserMetadata(sub, {
    privateMetadata: {
      isEventProducer: true,
    },
  });
};
