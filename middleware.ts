import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  beforeAuth: (req) => {
    console.log(req.url)
  },
  publicRoutes: [
    "/",
    "/api/stripe/webhook",
    "/imprint",
    "/privacy-policy",
    "/tos",
    "/favicon/site.webmanifest",
  ],
  debug: true,
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
