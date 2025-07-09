// import Link from "next/link";

// import { Button, buttonVariants } from "@/components/ui/button";

// import { LayoutDashboardIcon } from "lucide-react";
// import UserAvatar from "./UserAvatar";
// import { auth } from "@clerk/nextjs/server";

// const navigation = [
//   { name: "Inicío", href: "/" },
//   {
//     name: "Eventos",
//     href: "/events",
//   },
//   {
//     name: "Sobre",
//     href: "/about",
//   },
// ];

// export default async function Navbar() {
//   // const pathname = usePathname();

//   // const isCurrentPage = (href) => pathname === href;

//   const { userId } = await auth();

//   return (
//     <header className="top-0 left-0 w-screen fixed md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-[70%] border bg-background/80 backdrop-blur-sm md:rounded-full z-50">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="flex items-center">
//           <span className="text-xl font-bold">THEVENT</span>
//         </Link>

//         <nav className="hidden md:flex space-x-4">
//           {navigation.map(({ name, href }, index) => (
//             <Link
//               key={index}
//               href={href}
//               className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
//             >
//               {name}
//             </Link>
//           ))}
//         </nav>

//         <div className="flex items-center gap-4">
//           {userId && (
//             <Link href="/app" className={buttonVariants()}>
//               <LayoutDashboardIcon /> Dashboard
//             </Link>
//           )}
//           <UserAvatar />
//         </div>
//       </div>
//     </header>
//   );
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, Trophy, Calendar, User, Heart, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Thevent
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar eventos, modalidades, cidades..."
                className="pl-10 glass border-white/20 bg-transparent"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/events" className="text-sm font-medium hover:text-primary transition-colors">
              Todos os Eventos
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categorias
            </Link>
            <Link href="/calendar" className="text-sm font-medium hover:text-primary transition-colors">
              Calendário
            </Link>
            <Link href="/organizers" className="text-sm font-medium hover:text-primary transition-colors">
              Para Organizadores
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-dark border-white/20" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Elian Valdez</p>
                    <p className="text-xs leading-none text-muted-foreground">elian.valdez09@gmail.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Minhas Inscrições</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Eventos Favoritos</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-dark rounded-lg mt-2 mb-2">
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Buscar eventos..." className="pl-10 glass border-white/20 bg-transparent" />
                </div>
              </div>
              <Link href="/events" className="block px-3 py-2 text-sm font-medium hover:text-primary">
                Todos os Eventos
              </Link>
              <Link href="/categories" className="block px-3 py-2 text-sm font-medium hover:text-primary">
                Categorias
              </Link>
              <Link href="/calendar" className="block px-3 py-2 text-sm font-medium hover:text-primary">
                Calendário
              </Link>
              <Link href="/organizers" className="block px-3 py-2 text-sm font-medium hover:text-primary">
                Para Organizadores
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

