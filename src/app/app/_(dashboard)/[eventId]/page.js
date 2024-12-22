import { Suspense } from "react";
import DashboardPageClient from "./page-client";
import { getUrl } from "@/lib/getUrl";

const getAnalytics = async (eventId) => {
  const analyticsRes = await fetch(
    new URL(getUrl(`/api/analytics/${eventId}`)),
    {
      next: {
        revalidate: 0,
      },
    }
  );

  const analytics = await analyticsRes.json();

  return analytics;
};

const getOrders = async (eventId) => {
  const ordersRes = await fetch(
    new URL(getUrl(`/api/orders/byEvent/${eventId}?isDashboardHome=true`)),
    {
      next: {
        revalidate: 0,
      },
    }
  );

  const { orders: eventOrders } = await ordersRes.json();

  return eventOrders;
};

export default async function EventDetail(props) {
  const params = await props.params;
  const { eventId } = params;

  const analytics = await getAnalytics(eventId);
  const eventOrders = await getOrders(eventId);

  return (
    <DashboardPageClient analytics={analytics} eventOrders={eventOrders} />
  );
}
