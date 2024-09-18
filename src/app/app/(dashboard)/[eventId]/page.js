import { Suspense } from "react";
import DashboardPageClient from "./page-client";

const getAnalytics = async (eventId) => {
  const analyticsRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/analytics/${eventId}`,
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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/orders/byEvent/${eventId}?isDashboardHome=true`,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  const { orders: eventOrders } = await ordersRes.json();

  return eventOrders;
};

export default async function EventDetail({ params }) {
  const { eventId } = params;

  const analytics = await getAnalytics(eventId);
  const eventOrders = await getOrders(eventId);

  console.log(analytics, eventOrders);

  // const fetchClientSecret = async () => {
  //   const response = await fetch("/api/stripe/account_session", {
  //     method: "POST",
  //   });
  //   if (!response.ok) {
  //     const { error } = await response.json();
  //     console.log("An error occurred: ", error);
  //     return undefined;
  //   } else {
  //     const { client_secret: clientSecret } = await response.json();
  //     return clientSecret;
  //   }
  // };

  // setStripeConnectInstance(
  //   loadConnectAndInitialize({
  //     // This is your test publishable API key.
  //     publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  //     fetchClientSecret: fetchClientSecret,
  //     appearance: {
  //       overlays: "dialog",
  //       variables: {
  //         colorPrimary: "#625afa",
  //       },
  //     },
  //   })
  // );

  return (
    <DashboardPageClient analytics={analytics} eventOrders={eventOrders} />
  );
}
