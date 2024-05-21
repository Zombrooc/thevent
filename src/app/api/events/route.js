import { prisma } from "@/lib/database";

export async function GET(req) {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      address: true,
      tags: true,
    },
  });

  return Response.json(...events);
}
