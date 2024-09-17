"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  EyeIcon,
  RocketIcon,
  Users,
} from "lucide-react";
import { getEventData } from "../_actions/getEventData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DashboardPageClient from "./page-client";

export default function EventDetail({ params }) {
  const pathnmame = usePathname();

  const [eventOrders, setEventOrders] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const getData = async (params) => {
      const analyticsRes = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/analytics/${params.eventId}`,
        {
          next: {
            revalidate: 0,
          },
        },
      );

      const ordersRes = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/orders/byEvent/${params.eventId}?isDashboardHome=true`,
        {
          next: {
            revalidate: 0,
          },
        },
      );

      const analytics = await analyticsRes.json();
      const { orders } = await ordersRes.json();

      setAnalytics(analytics);
      setEventOrders(orders);
    };

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

    getData(params);
  }, []);

  return (
    <DashboardPageClient analytics={analytics} eventOrders={eventOrders} />
  );
}
