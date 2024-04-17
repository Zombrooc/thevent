import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
<<<<<<< HEAD
  matcher: ["/app/:path*", "/api/stripe/:path*"],
=======
  matcher: ["/app/:path*"],
>>>>>>> 0b4e53ad89929980a125ead7fc3ec5d956c33f2e
};
