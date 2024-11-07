import Link from "next/link";

import { Button } from "@/components/ui/button";

import { LayoutDashboardIcon } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { auth } from "@clerk/nextjs/server";

const navigation = [
  { name: "Inicío", href: "/" },
  {
    name: "Eventos",
    href: "/events",
  },
  {
    name: "Sobre",
    href: "/about",
  },
];

export default async function Navbar() {
  // const pathname = usePathname();

  // const isCurrentPage = (href) => pathname === href;

  const { userId } = await auth();

  return (
    <header className="top-0 left-0 w-screen fixed md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-[70%] border bg-background/80 backdrop-blur-sm md:rounded-full z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">THEVENT</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          {navigation.map(({ name, href }, index) => (
            <Link
              key={index}
              href={href}
              className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {userId && (
            <Button asChild>
              <Link href="/app">
                {" "}
                <LayoutDashboardIcon /> Dashboard
              </Link>
            </Button>
          )}
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
