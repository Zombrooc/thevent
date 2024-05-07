// import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

// export default withMiddlewareAuthRequired();

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/app(.*)",
  "/api/stripe/create-session",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const pathname = req.nextUrl.pathname;

  if (pathname.includes("/auth") && auth().sessionId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
  }
});

export const config = {
  matcher: [
    // "/app/:path*",
    // "/api/stripe/checkout-sessions",
    "/((?!.*\\..*|_next).*)",
  ],
};
