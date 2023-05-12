import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/trpc(.*)",
    "/api/stripe/webhook",
    "/imprint",
    "/privacy-policy",
    "/tos",
    "/favicon/site.webmanifest",
  ],
  debug: true,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
