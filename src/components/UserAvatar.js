import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Suspense } from "react";
import UserButtonOptions from "./UserButtonOptions";

export default function UserAvatar() {
  return (
    <>
      <ClerkProvider localization={ptBR}>
        <Suspense fallback={<Skeleton className="rounded-full h-8 w-8" />}>
          <SignedIn>
            <UserButtonOptions />
          </SignedIn>
          <SignedOut>
            <SignInButton asChild>
              <Button variant="outline">Entrar</Button>
            </SignInButton>
            <SignUpButton asChild>
              <Button>Registrar</Button>
            </SignUpButton>
          </SignedOut>
        </Suspense>
      </ClerkProvider>
    </>
  );
}
