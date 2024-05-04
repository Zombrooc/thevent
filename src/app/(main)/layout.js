import Navbar from "@/components/Navbar";

// export const metadata = {
//   title: {
//     template: "%s | Thevent",
//     default: "Thevent",
//   },
//   description:
//     "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação. Junte-se a nós e eleve sua experiência atlética a novos patamares!",
//   applicationName: "Thevent",
//   keywords: [
//     "eventos esportivos",
//     "ingressos para competições",
//     "plataforma de eventos esportivos",
//     "compra de ingressos esportivos",
//     "Thevent eventos",
//   ],
//   authors: "Elian Valdez",
//   twitter: {
//     card: "summary_large_image",
//     site: "@Thevent",
//     title: "Thevent",
//     description:
//       "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
//     image: "https://thevent.com.br/og-image.jpg",
//     creator: "@ElianValdez",
//   },
//   openGraph: {
//     title: "Thevent",
//     description:
//       "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
//     url: "https://thevent.com.br",
//     image: "https://thevent.com.br/og-image.jpg",
//     site_name: "Thevent",
//     type: "website",
//   },
//   facebook: {
//     app_id: "1234567890",
//     title: "Thevent",
//     description:
//       "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
//     image: "https://thevent.com.br/og-image.jpg",
//     url: "https://thevent.com.br",
//   },
// };

export default async function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
