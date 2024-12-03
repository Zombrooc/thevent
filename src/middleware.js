import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher([
  "/app/onboarding/default-user",
  "/app/onboarding/events-producer",
]);
const isProtectedRoute = createRouteMatcher([
  "/app(.*)",
  "/api/stripe/create-session",
  "/event/(.*)/confirm-purchase/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  if (isProtectedRoute(req)) await auth.protect();

  const { userId, sessionClaims } = await auth();

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboading route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/app/onboarding/default-user/", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  if (
    userId &&
    !sessionClaims?.metadata?.eventProducerOnBoardingFlowCompleted &&
    pathname.includes("/app")
  ) {
    const onboardingUrl = new URL("/app/onboarding/events-producer/", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  // if (userId && !isPublicRoute(req)) return NextResponse.next();
});

// export const config = {
//   matcher: [
//     // "/app/:path*",
//     // "/api/stripe/checkout-sessions",
//     "/((?!.*\\..*|_next).*)",
//   ],
// };

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
