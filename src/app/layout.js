import { Inter as FontSans } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    template: "%s | Thevent",
    default: "Thevent",
  },
  description:
    "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação. Junte-se a nós e eleve sua experiência atlética a novos patamares!",
  applicationName: "Thevent",
  keywords: [
    "eventos esportivos",
    "ingressos para competições",
    "plataforma de eventos esportivos",
    "compra de ingressos esportivos",
    "Thevent eventos",
  ],
  authors: "Elian Valdez",
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@Thevent",
  //   title: "Thevent",
  //   description:
  //     "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
  //   image: "https://thevent.com.br/og-image.jpg",
  //   creator: "@ElianValdez",
  // },
  // openGraph: {
  //   title: "Thevent",
  //   description:
  //     "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
  //   url: "https://thevent.com.br",
  //   image: "https://thevent.com.br/og-image.jpg",
  //   site_name: "Thevent",
  //   type: "website",
  // },
  // facebook: {
  //   app_id: "1234567890",
  //   title: "Thevent",
  //   description:
  //     "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
  //   image: "https://thevent.com.br/og-image.jpg",
  //   url: "https://thevent.com.br",
  // },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <UserProvider>
          <div className="fixed left-0 top-0 -z-10">
            <div className="relative h-full w-full">
              <div className="fixed h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>
          </div>

          {children}
        </UserProvider>
        <Toaster />
        {/* <Footer /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
