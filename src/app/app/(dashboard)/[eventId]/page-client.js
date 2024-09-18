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
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardPageClient({ analytics, eventOrders }) {
  const pathnmame = usePathname();

  return (
    <>
      {/* {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}> */}
      <main className="flex flex-2 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Visão Geral</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
              <CardTitle className="text-sm font-medium">Visitas</CardTitle>
              <EyeIcon className="h-5 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {(analytics && (
                <div className="text-3xl font-bold">{analytics?.pageViews}</div>
              )) || <Skeleton className="w-[199px] h-10" />}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Vendido
              </CardTitle>
              <DollarSign className="h-5 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {(analytics && (
                <div className="text-3xl font-bold">
                  R$ {analytics?.totalRevenue}
                </div>
              )) || <Skeleton className="w-[199px] h-10" />}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
              <CardTitle className="text-sm font-medium">
                Média de vendas
              </CardTitle>
              <Users className="h-5 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {(analytics && (
                <>
                  <div className="text-3xl font-bold">
                    +{analytics?.avgRevenue}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +179.1% from last month
                  </p>
                </>
              )) || <Skeleton className="w-[199px] h-10" />}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
              <CardTitle className="text-sm font-medium">
                Qtd. de Vendas
              </CardTitle>
              <CreditCard className="h-5 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {(analytics && (
                <div className="text-3xl font-bold">
                  +{analytics?.sellQuantity}
                </div>
              )) || <Skeleton className="w-[199px] h-10" />}

              {/* <p className="text-xs text-muted-foreground">
            +18% from last month
          </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingressos vendidos
              </CardTitle>
              <Activity className="h-5 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {(analytics && (
                <div className="text-3xl font-bold">
                  +{analytics?.soldTickets}
                </div>
              )) || <Skeleton className="w-[199px] h-10" />}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-5 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-3">
                <CardTitle>Transações</CardTitle>
                <CardDescription>
                  Transações recentes do seu evento.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-2">
                <Link href={`${pathnmame}/orders`}>
                  Ver Todos
                  <ArrowUpRight className="h-5 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {(eventOrders && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:inline">Data</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {eventOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium">{order?.user?.name}</div>
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
                              className="text-xs bg-yellow-401"
                              variant="outline"
                            >
                              Pendente
                            </Badge>
                          )}

                          {order.paymentStatus !== "unpaid" &&
                            order.paymentStatus !== "paid" && (
                              <Badge className="text-xs " variant="destructive">
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
              )) || <Skeleton className="col-span-full h-[249px]" />}
            </CardContent>
          </Card>
          {/* <Card x-chunk="dashboard-2-chunk-5">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-9">
            <div className="flex items-center gap-5">
              <Avatar className="hidden h-10 w-9 sm:flex">
                <AvatarImage src="/avatars/0.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <p className="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p className="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$0,999.00</div>
            </div>
            <div className="flex items-center gap-5">
              <Avatar className="hidden h-10 w-9 sm:flex">
                <AvatarImage src="/avatars/1.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$38.00</div>
            </div>
            <div className="flex items-center gap-5">
              <Avatar className="hidden h-10 w-9 sm:flex">
                <AvatarImage src="/avatars/2.png" alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <p className="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p className="text-sm text-muted-foreground">
                  isabella.nguyen@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$298.00</div>
            </div>
            <div className="flex items-center gap-5">
              <Avatar className="hidden h-10 w-9 sm:flex">
                <AvatarImage src="/avatars/3.png" alt="Avatar" />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <p className="text-sm font-medium leading-none">William Kim</p>
                <p className="text-sm text-muted-foreground">will@email.com</p>
              </div>
              <div className="ml-auto font-medium">+$98.00</div>
            </div>
            <div className="flex items-center gap-5">
              <Avatar className="hidden h-10 w-9 sm:flex">
                <AvatarImage src="/avatars/4.png" alt="Avatar" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">
                  sofia.davis@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$38.00</div>
            </div>
          </CardContent>
        </Card> */}
        </div>
      </main>
      {/* </ConnectComponentsProvider>
      )} */}
    </>
  );
}
