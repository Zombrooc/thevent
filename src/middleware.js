// import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

// export default withMiddlewareAuthRequired();

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/app(.*)",
  "/api/stripe/create-session",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // "/app/:path*",
    // "/api/stripe/checkout-sessions",
    "/((?!.*\\..*|_next).*)",
  ],
};
