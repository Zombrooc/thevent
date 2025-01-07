import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST(req, { params }) {
  const { eventId } = await params;

  try {
    await redis.json.numincrby(`analytics:${eventId}`, `$.pageViews`, 1);

    return new Response({ status: 200 });
  } catch (err) {
    return new NextResponse({
      status: err.statusCode || 500,
      body: err.message,
    });
  }
}
