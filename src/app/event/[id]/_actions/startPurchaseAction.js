// "use server";

// import { prisma } from "@/lib/prisma";
// import { add } from "date-fns";
// import cuid from "cuid";
// // import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { getStripeProduct, normalizeStripePrice } from "@/lib/stripe";
// import { qstashClient } from "@/lib/qstash";
// // import { Redis } from "@upstash/redis";
// import { RESERVATION_STATUS } from "@prisma/client";

// // const redis = Redis.fromEnv();

// export const startPurchaseAction = async ({
//   ticketCart,
//   totalPrice,
//   eventID,
// }) => {
//   // const { userId } = await auth();

//   // if (!userId) {
//   //   RedirectToSignIn;
//   // }

//   if (!ticketCart || ticketCart.length === 0) {
//     throw new Error("Nenhum ingresso fornecido.");
//   }

//   const getStockTransaction = await ticketCart.map(({ id: ticketID }) => {
//     return prisma.ticket.findUnique({
//       where: {
//         id: ticketID,
//       },
//       select: {
//         _count: {
//           select: {
//             reservedTickets: {
//               where: {
//                 AND: [
//                   { ticketId: ticketID },
//                   { version: 0 },
//                   {
//                     status: {
//                       in: [
//                         RESERVATION_STATUS.RESERVED,
//                         RESERVATION_STATUS.SUCCESSFUL,
//                       ],
//                     },
//                   },
//                 ],
//               },
//             },
//           },
//         },
//         ticketDefaultAvailableStock: true,
//       },
//     });
//   });

//   const stockQuery = await prisma.$transaction(getStockTransaction);

//   let appFee = 0;

//   const orderItemsCreationQueries = [];
//   const reservationQueries = [];
//   await Promise.all(
//     ticketCart.map(async ({ id: ticketID, quantity }, index) => {
//       const {
//         _count: { usedTickets },
//         ticketDefaultAvailableStock,
//       } = stockQuery[index];

//       const currentStock =
//         parseInt(ticketDefaultAvailableStock) - parseInt(usedTickets);

//       if (quantity > currentStock) {
//         throw new Error(`Insufficient stock for ticket ${ticketID}`);
//       }

//       const { ticketPrice, ticketSubTotalPrice } =
//         await getStripeProduct(ticketID);

//       const ticketFee =
//         (normalizeStripePrice(parseFloat(ticketPrice)) -
//           normalizeStripePrice(parseFloat(ticketSubTotalPrice))) *
//         Number(quantity);

//       appFee += ticketFee;

//       for (let n = 0; n < quantity; n++) {
//         orderItemsCreationQueries.push({
//           ticket: { connect: { id: ticketID } },
//         });

//         reservationQueries.push({
//           status: RESERVATION_STATUS.RESERVED,
//           ticket: { connect: { id: ticketID } },
//           expiresAt: add(new Date(), {
//             minutes: 15,
//           }),
//         });
//       }
//     })
//   );

//   // const currentStock = await getCurrentStock.exec();

//   // for (let i = 0; i < currentStock.length; i++) {
//   //   const availableQuantity = parseInt(currentStock[i], 10);
//   //   if (availableQuantity < ticketCart[i].quantity) {
//   //     throw new Error(`Insufficient stock for ticket ${ticketCart[i].id}`);
//   //   }
//   // }

//   const orderContent = {
//     orderItems: {
//       create: orderItemsCreationQueries,
//     },
//     reservedTickets: {
//       create: reservationQueries,
//     },
//     event: {
//       connect: { id: eventID },
//     },
//     total: totalPrice,
//     subTotal: totalPrice - appFee,
//     paymentStatus: "unpaid",
//   };

//   console.log("Reservations: ", reservationQueries);
//   console.log("Order Content: ", orderContent);

//   const order = await prisma.order.create({
//     data: orderContent,
//   });

//   console.log("Order: ", order);
//   if (order) {
//     redirect(`/event/${eventID}/confirm-purchase/${order.id}`);
//   } else {
//     throw new Error("Unable to create a new order");
//   }
//   // await qstashClient.publishJSON({
//   //   url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/orders`,
//   //   body: orderContent,
//   // });
// };

"use server";

// import { auth } from "@clerk/nextjs/dist/types/server";

// const redis = Redis.fromEnv();

export const startPurchaseAction = async ({
  ticketCart,
  totalPrice,
  eventID,
}) => {
  const { userId, redirectToSignIn } = await auth();

  if (!ticketCart || ticketCart.length === 0) {
    throw new Error("Nenhum ingresso fornecido.");
  }

  console.log("Chegou aqui");

  try {
    await fetch(`${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/orders`, {
      method: "POST",
      body: JSON.stringify({ ticketCart, totalPrice, eventID }),
    });
  } catch (error) {
    console.error(error);

    throw new Error("Smething Wrong", error);
  }
  // const getStockTransaction = await ticketCart.map(({ id: ticketID }) => {
  //   return prisma.ticket.findUnique({
  //     where: {
  //       id: ticketID,
  //     },
  //     select: {
  //       _count: {
  //         select: {
  //           reservedTickets: {
  //             where: {
  //               AND: [
  //                 { ticketId: ticketID },
  //                 { version: 0 },
  //                 {
  //                   status: {
  //                     in: [
  //                       RESERVATION_STATUS.RESERVED,
  //                       RESERVATION_STATUS.SUCCESSFUL,
  //                     ],
  //                   },
  //                 },
  //               ],
  //             },
  //           },
  //         },
  //       },
  //       ticketDefaultAvailableStock: true,
  //     },
  //   });
  // });

  // const stockQuery = await prisma.$transaction(getStockTransaction);

  // let appFee = 0;

  // const orderItemsCreationQueries = [];
  // const reservationQueries = [];
  // await Promise.all(
  //   ticketCart.map(async ({ id: ticketID, quantity }, index) => {
  //     const {
  //       _count: { usedTickets },
  //       ticketDefaultAvailableStock,
  //     } = stockQuery[index];

  //     const currentStock =
  //       parseInt(ticketDefaultAvailableStock) - parseInt(usedTickets);

  //     if (quantity > currentStock) {
  //       throw new Error(`Insufficient stock for ticket ${ticketID}`);
  //     }

  //     const { ticketPrice, ticketSubTotalPrice } =
  //       await getStripeProduct(ticketID);

  //     const ticketFee =
  //       (normalizeStripePrice(parseFloat(ticketPrice)) -
  //         normalizeStripePrice(parseFloat(ticketSubTotalPrice))) *
  //       Number(quantity);

  //     appFee += ticketFee;

  //     for (let n = 0; n < quantity; n++) {
  //       orderItemsCreationQueries.push({
  //         ticket: { connect: { id: ticketID } },
  //       });

  //       reservationQueries.push({
  //         status: RESERVATION_STATUS.RESERVED,
  //         ticket: { connect: { id: ticketID } },
  //         expiresAt: add(new Date(), {
  //           minutes: 15,
  //         }),
  //       });
  //     }
  //   })
  // );

  // // const currentStock = await getCurrentStock.exec();

  // // for (let i = 0; i < currentStock.length; i++) {
  // //   const availableQuantity = parseInt(currentStock[i], 10);
  // //   if (availableQuantity < ticketCart[i].quantity) {
  // //     throw new Error(`Insufficient stock for ticket ${ticketCart[i].id}`);
  // //   }
  // // }

  // const orderContent = {
  //   orderItems: {
  //     create: orderItemsCreationQueries,
  //   },
  //   reservedTickets: {
  //     create: reservationQueries,
  //   },
  //   event: {
  //     connect: { id: eventID },
  //   },
  //   total: totalPrice,
  //   subTotal: totalPrice - appFee,
  //   paymentStatus: "unpaid",
  // };

  // console.log("Reservations: ", reservationQueries);
  // console.log("Order Content: ", orderContent);

  // const order = await prisma.order.create({
  //   data: orderContent,
  // });

  // console.log("Order: ", order);
  // if (order) {
  //   redirect(`/event/${eventID}/confirm-purchase/${order.id}`);
  // } else {
  //   throw new Error("Unable to create a new order");
  // }
  // await qstashClient.publishJSON({
  //   url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/orders`,
  //   body: orderContent,
  // });
};
