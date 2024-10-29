import { prisma } from "@/lib/prisma";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
// export async function GET(req) {
//   const { eventId } = await req.json();

//   try {
//     const eventAnalytics = await prisma.analytics.findUnique({
//       where: {
//         eventId: eventId,
//       },
//     });

//     return Response.json(eventAnalytics);
//   } catch (err) {
//     return new Response({
//       status: err.statusCode,
//       message: err.message,
//     });
//   }
// }

export async function POST(req) {
  const { eventId } = await req.json();

  try {
    const eventAnalytics = await redis.getAll(`analytics:${eventId}`);

    if (eventAnalytics) {
      return Response.json(eventAnalytics);
    }

    const newEventAnalytics = await redis.set({
      pageViews: 0,
      totalRevenue: 0,
      avgRevenue: 0,
      soldTickets: 0,
      sellQuantity: 0,
    });

    return Response.json(newEventAnalytics);
  } catch (err) {
    return new Response({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
}
