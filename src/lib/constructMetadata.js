const HOME_DOMAIN = "https://thevent.com.br";

export function constructMetadata(
  title = `${process.env.NEXT_PUBLIC_APP_NAME} - Seu próximo desafio está aqui`,
  description = `${process.env.NEXT_PUBLIC_APP_NAME} é a plataforma ideal para encontrar eventos esportivos, onde a paixão pelo esporte encontra as melhores oportunidades de participação. Junte-se a nós e eleve sua experiência atlética a novos patamares!`,
  image = "https://assets.dub.co/thumbnail.jpg",
  keywords = [
    "eventos esportivos",
    "ingressos para competições",
    "plataforma de eventos esportivos",
    "compra de ingressos esportivos",
    "Thevent eventos",
  ],
  icons = [
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
  noIndex = false,
  authors = ["Elian Valdez"],
  applicationName = process.env.NEXT_PUBLIC_APP_NAME
) {
  return {
    title,
    description,
    authors,
    keywords,
    applicationName,
    openGraph: {
      title,
      description,
      ...(image && {
        images: [
          {
            url: image,
          },
        ],
      }),
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
