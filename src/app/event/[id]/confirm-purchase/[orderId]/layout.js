import { constructMetadata } from "@/lib/constructMetadata";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const title = `Dados extras - ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return constructMetadata(title);
}

export default async function Layout({ children, params }) {
  auth().protect();

  return <>{children}</>;
}
