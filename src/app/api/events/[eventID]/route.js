import { prisma } from "@/lib/database";

export async function GET(req, { params }) {
  const { eventID } = params;

  const eventData = await prisma.event.findUnique({
    where: {
      id: eventID,
    },
    include: {
      address: true,
      tags: true,
      tickets: {
        include: {
          form: true,
        },
      },
    },
  });

  if (eventData) {
    return Response.json({
      eventData: eventData,
    });
  } else {
    return new Response(
      {
        message: "Event not found",
      },
      {
        status: 404,
      }
    );
  }
}
