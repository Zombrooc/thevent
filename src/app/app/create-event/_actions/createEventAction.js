export const createEventAction = async (eventData) => {
  try {
    const event = await prisma.event.create({
      data: eventData.event,
    });

    const ticket = await prisma.ticket.create({
      data: {
        ...eventData.ticket,
        eventId: event.id,
      },
    });

    const address = await prisma.address.create({
      data: {
        ...eventData.address,
        eventId: event.id,
      },
    });

    return { event, ticket, address };
  } catch (error) {
    console.error("Erro na ação de criar evento:", error);
    throw error;
  }
};
