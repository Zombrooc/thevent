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

import {
  Settings,
  LogOut,
  Plus,
  LayoutDashboard,
  User,
  LayoutDashboardIcon,
} from "lucide-react";
import UserAvatar from "./UserAvatar";

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
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">THEVENT</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/app">
              {" "}
              <LayoutDashboardIcon /> Dashboard
            </Link>
          </Button>
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
