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

// 'use client'

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Activity,
//   CreditCard,
//   DollarSign,
//   Download,
//   Users,
//   Package,
//   Search,
//   Settings,
//   Ticket,
//   Link as LinkIcon,
//   BarChart,
//   Home,
//   LogOut,
//   Menu,
// } from "lucide-react"
// import Link from "next/link"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// const data = [
//   { name: "Jan", value: 400 },
//   { name: "Feb", value: 300 },
//   { name: "Mar", value: 600 },
//   { name: "Apr", value: 800 },
//   { name: "May", value: 700 },
// ]

// const recentTransactions = [
//   {
//     id: "1",
//     customer: "John Doe",
//     status: "Completed",
//     date: "2024-01-20",
//     amount: "R$ 150,00",
//   },
//   {
//     id: "2",
//     customer: "Jane Smith",
//     status: "Processing",
//     date: "2024-01-19",
//     amount: "R$ 250,00",
//   },
//   {
//     id: "3",
//     customer: "Bob Johnson",
//     status: "Completed",
//     date: "2024-01-18",
//     amount: "R$ 100,00",
//   },
// ]

// export default function Component() {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       {/* Sidebar */}
//       <aside className="hidden w-64 flex-col border-r bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm lg:flex">
//         <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
//           <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
//             <Package className="h-6 w-6" />
//             <span>THEVENT</span>
//           </Link>
//         </div>
//         <nav className="flex-1 space-y-1 p-4">
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary"
//           >
//             <Home className="h-4 w-4" />
//             Overview
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
//           >
//             <BarChart className="h-4 w-4" />
//             Analytics
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
//           >
//             <Ticket className="h-4 w-4" />
//             Tickets
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
//           >
//             <LinkIcon className="h-4 w-4" />
//             Affiliates
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
//           >
//             <Settings className="h-4 w-4" />
//             Settings
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Header */}
//         <header className="flex h-14 items-center gap-4 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 lg:h-[60px]">
//           <Button variant="ghost" size="icon" className="lg:hidden">
//             <Menu className="h-6 w-6" />
//           </Button>
//           <div className="flex flex-1 items-center gap-4">
//             <form className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="w-full appearance-none bg-white dark:bg-gray-800 pl-8 lg:w-[300px]"
//                 />
//               </div>
//             </form>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
//                     <AvatarFallback>U</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">username</p>
//                     <p className="text-xs leading-none text-gray-500 dark:text-gray-400">user@example.com</p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>

//         {/* Main Dashboard */}
//         <main className="flex-1 space-y-4 p-8 pt-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">Dashboard</h2>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="sm" className="bg-white dark:bg-gray-800">
//                 <Download className="mr-2 h-4 w-4" />
//                 Download Report
//               </Button>
//             </div>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                 <DollarSign className="h-4 w-4 opacity-75" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">R$ 45,231.89</div>
//                 <p className="text-xs opacity-75">+20.1% from last month</p>
//               </CardContent>
//             </Card>
//             <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
//                 <Ticket className="h-4 w-4 opacity-75" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+2350</div>
//                 <p className="text-xs opacity-75">+180.1% from last month</p>
//               </CardContent>
//             </Card>
//             <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//                 <Users className="h-4 w-4 opacity-75" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+12,234</div>
//                 <p className="text-xs opacity-75">+19% from last month</p>
//               </CardContent>
//             </Card>
//             <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Page Views</CardTitle>
//                 <Activity className="h-4 w-4 opacity-75" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+573,234</div>
//                 <p className="text-xs opacity-75">+201 since last hour</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Charts and Tables */}
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle className="text-gray-800 dark:text-white">Overview</CardTitle>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <ResponsiveContainer width="100%" height={350}>
//                   <LineChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//                     <XAxis dataKey="name" stroke="#888" />
//                     <YAxis stroke="#888" />
//                     <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
//                     <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2 }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//             <Card className="col-span-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
//               <CardHeader>
//                 <CardTitle>Recent Transactions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-8">
//                   {recentTransactions.map((transaction) => (
//                     <div key={transaction.id} className="flex items-center">
//                       <Avatar className="h-9 w-9 bg-white/25">
//                         <AvatarFallback className="text-white">{transaction.customer[0]}</AvatarFallback>
//                       </Avatar>
//                       <div className="ml-4 space-y-1">
//                         <p className="text-sm font-medium leading-none">{transaction.customer}</p>
//                         <p className="text-sm opacity-75">{transaction.date}</p>
//                       </div>
//                       <div className="ml-auto font-medium">{transaction.amount}</div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Recent Transactions Table */}
//           <Card className="bg-white dark:bg-gray-800">
//             <CardHeader>
//               <CardTitle className="text-gray-800 dark:text-white">All Transactions</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="text-gray-600 dark:text-gray-300">Customer</TableHead>
//                     <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
//                     <TableHead className="text-gray-600 dark:text-gray-300">Date</TableHead>
//                     <TableHead className="text-right text-gray-600 dark:text-gray-300">Amount</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {recentTransactions.map((transaction) => (
//                     <TableRow key={transaction.id}>
//                       <TableCell className="font-medium">{transaction.customer}</TableCell>
//                       <TableCell>
//                         <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                           transaction.status === 'Completed'
//                             ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
//                             : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
//                         }`}>
//                           {transaction.status}
//                         </span>
//                       </TableCell>
//                       <TableCell>{transaction.date}</TableCell>
//                       <TableCell className="text-right">{transaction.amount}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   )
// }
