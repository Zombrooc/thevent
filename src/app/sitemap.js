import { headers } from "next/headers";

export default async function sitemap() {
  const headersList = await headers();
  let domain = headersList.get("host");

  if (domain === "localhost:3000" || domain.endsWith(".vercel.app")) {
    // for local development and preview URLs
    domain = "thevent.com.br";
  }

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
  ];
}
