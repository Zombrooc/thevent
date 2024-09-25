"use server";

import { Redis } from "@upstash/redis";
import { prisma } from "@/lib/database";

const redis = Redis.fromEnv();

const getTicketStock = async (ticketId) => {
  try {
    // Tentar obter o estoque do Redis
    const stockKey = `ticket:${ticketId}:stock`;
    let stock = await redis.get(stockKey);
    let source = "redis";

    // Se não encontrado no Redis, buscar no PostgreSQL
    if (stock === null) {
      console.log(
        `Estoque não encontrado no Redis para o ingresso ${ticketId}. Verificando no PostgreSQL...`
      );

      source = "postgres";
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: { availableTickets: true },
      });

      console.log(ticket);

      if (ticket) {
        stock = ticket.availableTickets;

        // Atualizar o Redis com o valor do PostgreSQL
        await redis.set(stockKey, stock);
        console.log(
          `Redis atualizado com estoque do PostgreSQL para o ingresso ${ticketId}`
        );
      } else {
        console.warn(`Ingresso ${ticketId} não encontrado no PostgreSQL`);
        return null;
      }
    }

    return { stock: stock, source };
  } catch (error) {
    console.error(`Erro ao verificar estoque do ingresso ${ticketId}:`, error);
    throw error;
  }
};

export { getTicketStock };
