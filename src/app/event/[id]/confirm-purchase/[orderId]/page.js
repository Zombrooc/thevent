import { Redis } from "@upstash/redis";
import ConfirmPurchaseClient from "./page-client";

const redis = Redis.fromEnv();

const getOrder = async (orderId) => {
  const { orderItems } = await redis.get(`order:${orderId}`);

  let formQuantity = 0;
  const orderItemsWithForms = await Promise.all(
    orderItems.map(async (orderItem) => {
      const forms = await redis.get(`ticket:${orderItem.ticketID}:forms`);

      if (forms?.length >= 0) {
        formQuantity++;
        return {
          ...orderItem,
          forms,
        };
      }

      return {
        ...orderItem,
      };
    })
  );

  if (formQuantity === 0) {
    const response = await fetch("/api/stripe/checkout-sessions", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });

    if (response.status === 401 && response.statusText === "Unauthorized") {
      router.push("/api/auth/login");
    } else {
      response
        .json()
        .then((session) => {
          router.push(session.url);
        })
        .catch((err) => {
          console.error("Erro ao obter URL de checkout", err);
        });
    }
  }
  return { orderItems: orderItemsWithForms };
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
