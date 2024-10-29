import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { sessionClaims } = await auth();

  const userEvents = await prisma.event.findMany({
    where: {
      organizer: sessionClaims?.sub,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (userEvents) {
    return Response.json({
      userEvents: userEvents,
    });
  }

  return Response.json({
    userEvents: [],
  });
}
