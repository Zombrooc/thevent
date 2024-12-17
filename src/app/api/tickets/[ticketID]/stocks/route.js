import { prisma } from "@/lib/prisma";

import { RESERVATION_STATUS } from "@prisma/client";

export async function GET(req, { params }) {
  const { ticketID } = await params;

  try {
    const currentAvailableStock = await prisma.ticket.findUnique({
      where: {
        id: ticketID,
      },
      select: {
        _count: {
          select: {
            reservedTickets: {
              where: {
                AND: [
                  { version: 0 },
                  {
                    status: {
                      in: [
                        RESERVATION_STATUS.RESERVED,
                        RESERVATION_STATUS.SUCCESSFUL,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
        ticketDefaultAvailableStock: true,
      },
    });

    const {
      _count: { reservedTickets },
      ticketDefaultAvailableStock,
    } = currentAvailableStock;

    const currentStock =
      parseInt(ticketDefaultAvailableStock) - parseInt(reservedTickets);

    return Response.json(
      {
        success: true,
        currentStock,
        reservedTickets,
      },
      { status: 200 }
    );
  } catch (e) {
    return Response.json(
      {
        success: false,
        error: {
          ...e,
        },
      },
      {
        status: e.status || 500,
      }
    );
  }
}
