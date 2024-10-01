"use server";

import { Redis } from "@upstash/redis";
import { prisma } from "@/lib/database";

const redis = Redis.fromEnv();

const getTicketStock = async (ticketId) => {
  try {
    // Tentar obter o estoque do Redis
    const stockKey = `ticket:${ticketId}`;
    let ticketDetails = await redis.get(stockKey);
    let source = "redis";

    let hasStock = ticketDetails?.hasStock;

    if (ticketDetails === null) {
      // console.log(
      //   `Estoque não encontrado no Redis para o ingresso ${ticketId}. Verificando no PostgreSQL...`
      // );

      source = "postgres";

      const ticketDetails = await prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
        include: {
          _count: {
            select: {
              usedTickets: {
                where: {
                  ticketId: ticketId,
                  OR: [{ status: "RESERVED" }, { status: "SUCCESSFUL" }],
                },
              },
            },
          },
        },
      });

      const {
        _count,
        ticketDefaultaAvailableStock,
        ticketPrice,
        ticketName,
        ticketSubTotalPrice,
        stripeID,
      } = ticketDetails;

      hasStock =
        ticketDefaultaAvailableStock - _count.usedTickets >= 0 ? true : false;

      // Atualizar o Redis com o valor do PostgreSQL
      await redis.set(
        stockKey,
        {
          ticketPrice,
          ticketName,
          ticketSubTotalPrice,
          hasStock,
          stripeID,
          ticketDefaultaAvailableStock,
          usedTickets: _count.usedTickets,
        },
        {
          nx: true,
          ex: 60 * 60,
        }
      );
      // console.log(
      //   `Redis atualizado com estoque do PostgreSQL para o ingresso ${ticketId}`
      // );
    }
    // console.log(`Redis encontrado para o ingresso ${ticketId}`);

    return { hasStock, source };
  } catch (error) {
    // console.error(`Erro ao verificar estoque do ingresso ${ticketId}:`, error);
    throw error;
  }
};

export { getTicketStock };
