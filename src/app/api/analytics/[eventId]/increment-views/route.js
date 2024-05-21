import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { eventId } = params;

  try {
    const analytics = await prisma.analytics.update({
      where: {
        eventId: eventId,
      },
      data: {
        pageViews: {
          increment: 1,
        },
      },
    });

    return new Response({ status: 200, data: analytics });
  } catch (err) {
    return new NextResponse({
      status: err.statusCode || 500,
      body: err.message,
    });
  }
}
