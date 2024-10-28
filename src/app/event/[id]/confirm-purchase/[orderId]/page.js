import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";
import ConfirmPurchaseClient from "./page-client";

const redis = Redis.fromEnv();

const getOrder = async (orderId) => {
  const orderResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/orders/${orderId}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  if (orderResponse.status === 200) {
    const { orderItems } = await orderResponse.json();

    let formQuantity = 0;
    const orderItemsWithForms = await Promise.all(
      orderItems.map(async (orderItem) => {
        const { ticketName } = orderItem.ticket;
        const forms = await redis.get(`ticket:${orderItem.ticketId}:forms`);

        if (forms?.length >= 0) {
          formQuantity++;
          return {
            ...orderItem,
            ticketName,
            forms,
          };
        }

        return {
          ...orderItem,
        };
      })
    );

    if (formQuantity === 0) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/checkout-sessions`,
        {
          method: "POST",
          body: JSON.stringify({ orderId }),
        }
      );

      if (response.status === 401 && response.statusText === "Unauthorized") {
        redirect("/api/auth/login");
      } else {
        response
          .json()
          .then((session) => {
            redirect(session.url);
          })
          .catch((err) => {
            console.error("Erro ao obter URL de checkout", err);
          });
      }
    }
    return { orderItems: orderItemsWithForms };
  } else {
    return { error: 404 };
  }
};

export default async function EventDetails({ params }) {
  const { orderId } = params;
  const { orderItems } = await getOrder(orderId);

  return (
    <>
      <ConfirmPurchaseClient orderItems={orderItems} />
    </>
  );
}
