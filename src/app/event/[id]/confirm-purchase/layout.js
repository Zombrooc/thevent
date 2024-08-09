import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/constructMetadata";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const title = `Confirmar compra - ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return constructMetadata(title);
}

export default async function Layout({ children, params }) {
  // await incrementPageViews(params.id);
  auth().protect();

  return <>{children}</>;
}
