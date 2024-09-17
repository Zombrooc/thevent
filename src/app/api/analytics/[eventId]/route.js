import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req, { params }) {
  const { eventId } = params;

  const pageViews = await redis.get(`pageViews:${eventId}`);

  try {
    const eventAnalytics = await prisma.analytics.findUnique({
      where: {
        eventId: eventId,
      },
    });

    return Response.json({ ...eventAnalytics, pageViews: pageViews });
  } catch (err) {
    return new Response({
      status: err.statusCode,
      message: err.message,
    });
  }
}
