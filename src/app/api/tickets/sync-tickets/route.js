import { Redis } from "@upstash/redis";
import { prisma } from "@/lib/database";

const redis = Redis.fromEnv();

export async function POST(req) {
  console.log("Iniciando sincronização de ingressos...");

  try {
    // Buscar todos os ingressos do PostgreSQL
    const tickets = await prisma.Ticket.findMany();

    // Preparar operações em lote para o Redis
    const pipeline = redis.pipeline();

    for (const ticket of tickets) {
      const redisKey = `ticket:${ticket.id}:stock`;

      // Adicionar operação de set ao pipeline
      pipeline.set(redisKey, ticket.currentStock);
    }

    // Executar todas as operações de uma vez
    await pipeline.exec();

    console.log(
      `Sincronização concluída. ${tickets.length} ingressos atualizados.`
    );
    return Response.json({
      message: "Success",
    }).status(200);
  } catch (e) {
    return new Response({
      status: e.statusCode,
      body: e.message,
    });
  }
}
