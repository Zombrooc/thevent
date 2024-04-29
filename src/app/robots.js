import { headers } from "next/headers";

export default function robots() {
  const headersList = headers();
  let domain = headersList.get("host");

  if (domain === "thevent.com.br") {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: `https://${domain}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: "Googlebot", // for Googlebot
        allow: ["/$", "/api/og/"], // allow the home page and the OG image API
        disallow: "/", // disallow everything else
      },
      {
        userAgent: "LinkedInBot", // for LinkedInBot
        allow: "/", // allow everything
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
