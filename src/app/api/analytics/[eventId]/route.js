import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req, props) {
  const params = await props.params;
  const { eventId } = params;

  const analytics = await redis.json.get(`analytics:${eventId}`);

  return Response.json({ analytics: analytics });
}
