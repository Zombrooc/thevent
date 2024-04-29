import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/constructMetadata";
import { getSession } from "@auth0/nextjs-auth0";
export default async function Layout({ children }) {
  const session = await getSession();

  return (
    <>
      <Navbar user={session?.user} />
      {children}
    </>
  );
}
