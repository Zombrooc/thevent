import { prisma } from "@/lib/database";

export async function GET(req) {
  const { eventId } = await req.json();

  try {
    const eventAnalytics = await prisma.analytics.findUnique({
      where: {
        eventId: eventId,
      },
    });

    return Response.json(eventAnalytics);
  } catch (err) {
    return new Response({
      status: err.statusCode,
      message: err.message,
    });
  }
}

export async function POST(req) {
  const { eventId } = await req.json();

  try {
    const eventAnalytics = await prisma.analytics.findUnique({
      where: {
        eventId: eventId,
      },
    });

    if (eventAnalytics) {
      return Response.json(eventAnalytics);
    }

    const newEventAnalytics = await prisma.analytics.create();

    return Response.json(newEventAnalytics);
  } catch (err) {
    return new Response({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
}
