import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export default function User() {
  return (
    <>
      <SignedIn>
        <ClerkLoading>
          <Skeleton className="rounded-full h-8 w-8" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton className="text-sm font-semibold leading-6 text-gray-800 ml-5 hover:bg-primary hover:text-white py-2 px-4 rounded-md" />
        </ClerkLoaded>
      </SignedIn>
      <SignedOut>
        <SignInButton className="text-sm font-semibold leading-6 text-gray-800 ml-5 hover:bg-primary hover:text-white py-2 px-4 rounded-md">
          {" "}
          Entrar
        </SignInButton>
      </SignedOut>
    </>
  );
}
