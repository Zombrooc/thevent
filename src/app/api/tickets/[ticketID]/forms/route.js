export async function GET(req, props) {
  const params = await props.params;
  const { ticketID } = params;

  const events = await prisma.tickets.findUnique({
    where: {
      id: ticketID,
    },

    include: {
      form: true,
    },
  });

  console.log(events);

  if (events) {
    return Response.json({
      events,
    });
  }

  return Response.json({ events: [] });
}
