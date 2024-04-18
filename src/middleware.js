import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    "/app/:path*",
    "/api/stripe/checkout-sessions",
    // "/api/stripe/:path*",
    // "/((?!apil_next/static/_next/image/favicon.ico).*)",
  ],
};
