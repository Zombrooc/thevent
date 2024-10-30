"use client";

// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
import Link from "next/link";

// import { usePathname } from "next/navigation";
// import UserAvatar from "./User";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings, LogOut, Plus, LayoutDashboard, User } from "lucide-react";

// const navigation = [
//   { name: "Inicío", href: "/" },
//   {
//     name: "Evento",
//     sub: [
//       {
//         name: "Beach Tennis",
//         href: "#",
//         current: false,
//       },
//       {
//         name: "Tênis",
//         href: "#",
//         current: false,
//       },
//       {
//         name: "Corrida",
//         href: "#",
//         current: false,
//       },
//       {
//         name: "Trial",
//         href: "#",
//         current: false,
//       },
//       {
//         name: "Muay Thai",
//         href: "#",
//         current: false,
//       },
//     ],
//   },
// ];

export default function Navbar() {
  // const pathname = usePathname();

  // const isCurrentPage = (href) => pathname === href;

  return (
    <header className="top-0 left-0 w-screen fixed md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-[70%] border bg-background/80 backdrop-blur-sm md:rounded-full z-50">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">THEVENT</span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:flex sm:gap-4">
            <Button variant="outline">Login</Button>
            <Button>Sign up</Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="@username"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create Event</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
