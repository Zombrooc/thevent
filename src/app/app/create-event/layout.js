import Navbar from "@/components/Navbar";

import { getSession } from "@auth0/nextjs-auth0";

export default async function CreateEventLayout({ children }) {
  const session = await getSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="mx-auto max-w-xl py-12 px-2 sm:px-6 lg:px-8 bg-white">
        {children}
      </main>
    </>
  );
}
