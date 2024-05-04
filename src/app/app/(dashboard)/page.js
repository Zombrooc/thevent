// import EventListProvider from "@/store/features/eventList/eventProvider";
// import { getSession } from "@auth0/nextjs-auth0";

// import { prisma } from "@/lib/database";
// import { UserNav } from "@/components/user-nav";
// import Link from "next/link";
// import { Menu, Package2 } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import EventSwitcher from "./_components/event-switcher";
// import { Suspense } from "react";
// import { MainNav } from "./_components/main-nav";
// import { Overview } from "./_components/overview";
// import { RecentSales } from "./_components/recent-sales";

// import { ArrowUpRight } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getEventList } from "./actions/getEventList";

// export default async function Dashboard() {
//   const session = await getSession();

//   const eventList = await getEventList(session?.user);

//   return (
//     <div className="flex min-h-screen w-full flex-col">
//       <MainNav session={session} eventList={eventList} />
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//         <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//           <Overview />
//         </div>
//         <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
//           <Card className="xl:col-span-2">
//             <CardHeader className="flex flex-row items-center">
//               <div className="grid gap-2">
//                 <CardTitle>Transactions</CardTitle>
//                 <CardDescription>
//                   Recent transactions from your store.
//                 </CardDescription>
//               </div>
//               <Button asChild size="sm" className="ml-auto gap-1">
//                 <Link href="#">
//                   View All
//                   <ArrowUpRight className="h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Type
//                     </TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Status
//                     </TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Date
//                     </TableHead>
//                     <TableHead className="text-right">Amount</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Liam Johnson</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         liam@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Sale
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-23
//                     </TableCell>
//                     <TableCell className="text-right">$250.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Olivia Smith</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         olivia@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Refund
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Declined
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-24
//                     </TableCell>
//                     <TableCell className="text-right">$150.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Noah Williams</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         noah@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Subscription
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-25
//                     </TableCell>
//                     <TableCell className="text-right">$350.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Emma Brown</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         emma@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Sale
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-26
//                     </TableCell>
//                     <TableCell className="text-right">$450.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Liam Johnson</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         liam@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Sale
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-27
//                     </TableCell>
//                     <TableCell className="text-right">$550.00</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Sales</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-8">
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                   <AvatarFallback>OM</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Olivia Martin
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     olivia.martin@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$1,999.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/02.png" alt="Avatar" />
//                   <AvatarFallback>JL</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Jackson Lee
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     jackson.lee@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$39.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/03.png" alt="Avatar" />
//                   <AvatarFallback>IN</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Isabella Nguyen
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     isabella.nguyen@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$299.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/04.png" alt="Avatar" />
//                   <AvatarFallback>WK</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     William Kim
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     will@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$99.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/05.png" alt="Avatar" />
//                   <AvatarFallback>SD</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Sofia Davis
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     sofia.davis@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$39.00</div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { UserNav } from "@/components/user-nav";
// import { getSession } from "@auth0/nextjs-auth0";
import { getEventList } from "./_actions/getEventList";
import moment from "moment";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default async function Dashboard() {
  const user = await currentUser();

  const eventList = await getEventList(user);

  return (
    <div className="sm:gap-4 space-x-4 space-y-3">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Thevent</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Button size="sm" variant="outline" asChild>
          <Link href="/" className="h-7 gap-1">
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Início
            </span>
          </Link>
        </Button>
        {/* <Breadcrumbs /> */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <SignedIn>
          <UserButton className="text-sm font-semibold leading-6 text-gray-800 ml-5 hover:bg-primary hover:text-white py-2 px-4 rounded-md" />
        </SignedIn>
      </header>

      {eventList.length > 0 ? (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="draft">Rascunho</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Arquivados
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filtro
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Ativos
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Rascunhos
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Arquivados
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Exportar
                  </span>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/app/create-event" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Criar evento
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Meus Eventos</CardTitle>
                  <CardDescription>
                    Gerencie seus eventos e veja a performance de vendas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Status</TableHead>
                        {/* <TableHead>Price</TableHead> */}
                        {/* <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead> */}
                        <TableHead className="hidden md:table-cell">
                          Criado em
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Gerenciar Evento</span>
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Ações</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventList.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            {event.eventName}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Ativo</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {moment(event.createdAt).format("d MMMM YYYY")}
                          </TableCell>
                          <TableCell>
                            <Button asChild>
                              <Link href={`/app/${event.id}`}> Gerenciar </Link>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Excluir</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      ) : (
        <main className="grid flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-2xl">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Você não possui eventos criados
              </h3>
              <p className="text-sm text-muted-foreground">
                Comece a criar seu eventos.
              </p>
              <Link href="/app/create-event" className="mt-4">
                Criar Evento
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
