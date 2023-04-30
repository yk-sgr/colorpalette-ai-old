import { createTRPCNextLayout } from "@/@trpc/next-layout/server";
import { createContextInner } from "@/server/api/context";
import { appRouter } from "@/server/api/root";
import { auth as getAuth } from "@clerk/nextjs/app-beta";
import superjson from "superjson";

export const api = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  createContext() {
    const auth = getAuth();
    return createContextInner({
      auth,
      req: null,
    });
  },
});
