import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";
import ConfirmPurchaseClient from "./page-client";
import { auth } from "@clerk/nextjs/server";
import { getUrl } from "@/lib/getUrl";

const redis = Redis.fromEnv();

const getOrder = async (orderId) => {
  const orderResponse = await fetch(new URL(getUrl(`/api/orders/${orderId}`)), {
    next: {
      revalidate: 0,
    },
  });

  if (orderResponse.status === 200) {
    const { orderItems } = await orderResponse.json();

    const orderItemsWithForms = await Promise.all(
      orderItems.map(async (orderItem) => {
        const { ticketName } = orderItem.ticket;
        const forms = await redis.get(`ticket:${orderItem.ticketId}:forms`);

        if (forms?.length > 0) {
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

    return { orderItems: orderItemsWithForms };
  } else {
    return { error: 404 };
  }
};

export default async function EventDetails(props) {
  const params = await props.params;
  const { orderId } = params;
  const { orderItems } = await getOrder(orderId);

  return (
    <>
      <ConfirmPurchaseClient orderItems={orderItems} />
    </>
  );
}
