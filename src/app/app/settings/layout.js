import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./_components/sidebar-nav";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/app/settings/",
  },
  {
    title: "Account",
    href: "/app/settings/account",
  },
  {
    title: "Appearance",
    href: "/app/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/app/settings/notifications",
  },
  {
    title: "Display",
    href: "/app/settings/display",
  },
];

export default async function SettingsLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="md:hidden">
        <Image
          src="/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
