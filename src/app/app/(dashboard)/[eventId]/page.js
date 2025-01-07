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

const getLatestFiveOrders = async (eventId) => {
  const ordersRes = await fetch(
    new URL(getUrl(`/api/events/${eventId}/orders?take=5`)),
    {
      next: {
        revalidate: 0,
      },
    }
  );

  const orders = await ordersRes.json();

  console.log("Event Orders: ", orders);

  return eventOrders;
};

export default async function EventDetail(props) {
  const params = await props.params;
  const { eventId } = params;

  const analytics = await getAnalytics(eventId);
  const eventOrders = await getLatestFiveOrders(eventId);

  return (
    <DashboardPageClient analytics={analytics} eventOrders={eventOrders} />
  );
}
