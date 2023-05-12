import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/stripe/webhook",
    "/imprint",
    "/privacy-policy",
    "/tos",
    "/favicon/site.webmanifest",
  ],
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
