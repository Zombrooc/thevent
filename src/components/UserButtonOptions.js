"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Plus } from "lucide-react";

export default function UserButtonOptions() {
  return (
    <UserButton
      className="text-sm font-semibold leading-6 text-gray-800 ml-5 hover:bg-primary hover:text-white py-2 px-4 rounded-md"
      showName
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<LayoutDashboard />}
          href="/app"
        />
        <UserButton.Link
          label="Criar Evento"
          labelIcon={<Plus />}
          href="/app/create-event"
        />

        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
}
