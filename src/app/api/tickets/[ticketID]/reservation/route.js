import { add } from "date-fns";

export async function POST(req, { params }) {
  const ticketsToBeReserved = await req.json();
  const { ticketID } = await params;

  const reservationQuery = await ticketsToBeReserved.map(({ id: ticketID }) => {
    return {
      status: RESERVATION_STATUS.RESERVED,
      ticket: { connect: { id: ticketID } },
      expiresAt: add(new Date(), {
        minutes: 15,
      }),
    };
  });

  return Respose.json({ success: true, ticketID });
}
