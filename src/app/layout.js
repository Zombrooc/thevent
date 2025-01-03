import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/constructMetadata";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ptBR } from "@clerk/localizations";

import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const inter = localFont({
  src: "../assets/fonts/Inter.ttf",
  variable: "--font-inter",
});

export const metadata = constructMetadata();

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={cn("min-h-screen font-sans antialiased", inter.variable)}
      >
        {/* <UserProvider> */}
        <div className="fixed left-0 top-0 -z-10">
          <div className="relative h-full w-full">
            <div className="fixed h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>
        </div>

        {children}
        {/* </UserProvider> */}
        <Toaster />
        {/* <Footer /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
