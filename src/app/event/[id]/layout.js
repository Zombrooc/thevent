import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/database";
import { generateEventTitle, generateEventDescription } from "@/lib/gemini";
import { getSession } from "@auth0/nextjs-auth0";

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
//   // twitter: {
//   //   card: "summary_large_image",
//   //   site: "@Thevent",
//   //   title: "Thevent",
//   //   description:
//   //     "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
//   //   image: "https://thevent.com.br/og-image.jpg",
//   //   creator: "@ElianValdez",
//   // },
//   // openGraph: {
//   //   title: "Thevent",
//   //   description:
//   //     "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
//   //   url: "https://thevent.com.br",
//   //   image: "https://thevent.com.br/og-image.jpg",
//   //   site_name: "Thevent",
//   //   type: "website",
//   // },
//   // facebook: {
//   //   app_id: "1234567890",
//   //   title: "Thevent",
//   //   description:
//   //     "Descubra a plataforma definitiva para eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação.",
//   //   image: "https://thevent.com.br/og-image.jpg",
//   //   url: "https://thevent.com.br",
//   // },
// };

// export async function generateMetadata({ params, searchParams }, parent) {
//   const id = params.id;

//   let meta = {};
//   const eventData = await prisma.event.findUnique({ where: { id } });

//   const { textResponse } = await generateEventTitle(eventData.title);

//   console.log(textResponse);

//   const description = await generateEventDescription(eventData.description);
//   console.log(description);

//   return;

// const previousImages = (await parent).openGraph?.images || [];

// const metadata = eventData.sEOTags && eventData.sEOTags.length > 0 ? eventData.sEOTags.reduce((acc, tag) => {
//   acc[tag.tagName] = tag.content;
//   return acc;
// }, {}) : {
//   title: eventData.title,
//   description: eventData.description,
// };
// return {
//   ...metadata,
//   openGraph: {
//     images: ["/some-specific-page-image.jpg", ...previousImages],
//   },
// };
// }
// import store from "@/store/index";

export default async function Layout({ children }) {
  const session = await getSession();

  return (
    <>
      <Navbar user={session?.user} />
      {children}
    </>
  );
}

// https://redux.js.org/introduction/examples#shopping-cart
