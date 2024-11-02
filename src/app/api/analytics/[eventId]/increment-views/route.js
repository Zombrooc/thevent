import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST(req, props) {
  const params = await props.params;
  const { eventId } = params;

  try {
    await redis.incr(`pageViews:${eventId}`);

    return new Response({ status: 200 });
  } catch (err) {
    return new NextResponse({
      status: err.statusCode || 500,
      body: err.message,
    });
  }
}
