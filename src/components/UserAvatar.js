import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Skeleton } from "./ui/skeleton";
import { LayoutDashboard, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Suspense } from "react";

export default function UserAvatar() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ClerkProvider localization={ptBR} dynamic>
        <SignedIn>
          <ClerkLoading>
            <Skeleton className="rounded-full h-8 w-8" />
          </ClerkLoading>
          <ClerkLoaded>
            {/* <UserButton className="text-sm font-semibold leading-6 text-gray-800 ml-5 hover:bg-primary hover:text-white py-2 px-4 rounded-md" /> */}
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
          </ClerkLoaded>
        </SignedIn>
        <SignedOut>
          <SignInButton asChild>
            <Button variant="outline">Entrar</Button>
          </SignInButton>
          <SignUpButton asChild>
            <Button>Registrar</Button>
          </SignUpButton>
        </SignedOut>
      </ClerkProvider>
    </Suspense>
  );
}
