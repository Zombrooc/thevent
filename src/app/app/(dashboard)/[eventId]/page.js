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
import { loadConnectAndInitialize } from "@stripe/connect-js/pure";

import {
  ConnectPayments,
  ConnectComponentsProvider,
  ConnectBalances,
  ConnectPayouts,
} from "@stripe/react-connect-js";

export default function EventDetail({ params }) {
  const [currentEventData, setCurrentEventData] = useState(null);
  const [stripeConnectInstance, setStripeConnectInstance] = useState(null);

  const pathnmame = usePathname();

  useEffect(() => {
    const getData = async (params) => {
      const data = await getEventData(params?.eventId);

      setCurrentEventData(data);
    };

    const fetchClientSecret = async () => {
      const response = await fetch("/api/stripe/account_session", {
        method: "POST",
      });
      if (!response.ok) {
        const { error } = await response.json();
        console.log("An error occurred: ", error);
        return undefined;
      } else {
        const { client_secret: clientSecret } = await response.json();
        return clientSecret;
      }
    };

    setStripeConnectInstance(
      loadConnectAndInitialize({
        // This is your test publishable API key.
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        fetchClientSecret: fetchClientSecret,
        appearance: {
          overlays: "dialog",
          variables: {
            colorPrimary: "#625afa",
          },
        },
      })
    );

    getData(params);
  }, []);

  return (
    <>
      {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Visão Geral</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <ConnectBalances />

              {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Vendido
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {(currentEventData && (
                  <div className="text-2xl font-bold">
                    R$ {currentEventData?.totalRevenue}
                  </div>
                )) || <Skeleton className="w-[200px] h-10" />}
                
              </CardContent>
            </Card> */}
              <ConnectPayouts />
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Média de vendas
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {(currentEventData && (
                    <>
                      <div className="text-2xl font-bold">
                        +{currentEventData?.averageRevenue}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </>
                  )) || <Skeleton className="w-[200px] h-10" />}
                </CardContent>
              </Card> */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Qtd. de Vendas
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {(currentEventData && (
                    <div className="text-2xl font-bold">
                      +{currentEventData?.orderCount}
                    </div>
                  )) || <Skeleton className="w-[200px] h-10" />}

                  {/* <p className="text-xs text-muted-foreground">
            +19% from last month
          </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ingressos vendidos
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {(currentEventData && (
                    <div className="text-2xl font-bold">
                      +{currentEventData?.orderItemsCount}
                    </div>
                  )) || <Skeleton className="w-[200px] h-10" />}
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="col-span-full">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Transações</CardTitle>
                    <CardDescription>
                      Transações recentes do seu evento.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href={`${pathnmame}/orders`}>
                      Ver Todos
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {(currentEventData?.orders && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:inline">
                            Data
                          </TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {currentEventData?.orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <div className="font-medium">
                                {order?.user?.name}
                              </div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {order?.user?.email}
                              </div>
                            </TableCell>
                            <TableCell>
                              {order.paymentStatus === "paid" && (
                                <Badge
                                  className="text-xs bg-primary text-white"
                                  variant="outline"
                                >
                                  Aprovado
                                </Badge>
                              )}

                              {order.paymentStatus === "unpaid" && (
                                <Badge
                                  className="text-xs bg-yellow-400"
                                  variant="outline"
                                >
                                  Pendente
                                </Badge>
                              )}

                              {order.paymentStatus !== "unpaid" &&
                                order.paymentStatus !== "paid" && (
                                  <Badge
                                    className="text-xs "
                                    variant="destructive"
                                  >
                                    Error
                                  </Badge>
                                )}
                            </TableCell>
                            <TableCell className="hidden md:inline">
                              {moment(order.createdAt).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell className="text-right">
                              R$ {order.total}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )) || <Skeleton className="col-span-full h-[250px]" />}
                </CardContent>
              </Card>
              {/* <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p className="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p className="text-sm text-muted-foreground">
                  isabella.nguyen@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$299.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">William Kim</p>
                <p className="text-sm text-muted-foreground">will@email.com</p>
              </div>
              <div className="ml-auto font-medium">+$99.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">
                  sofia.davis@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
          </CardContent>
        </Card> */}
            </div>
          </main>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <ConnectPayments />
          </main>
        </ConnectComponentsProvider>
      )}
    </>
  );
}
