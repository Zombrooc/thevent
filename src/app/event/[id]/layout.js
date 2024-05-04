import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/constructMetadata";
// import { getSession } from "@auth0/nextjs-auth0";

export default async function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
