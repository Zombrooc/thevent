export async function GET(req, { params }) {
  const { eventId } = params;

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
