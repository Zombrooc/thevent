import { Inter } from "next/font/google"

import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/constructMetadata";

const inter = Inter({ subsets: ["latin"] })

export const metadata = constructMetadata();

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.className} suppressHydrationWarning>
      <body
        className="font-sans antialiased"
      >
          {children}
          <Toaster />
      </body>
    </html>
  );
}
