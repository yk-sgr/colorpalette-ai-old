"use client";

import {
  createHydrateClient,
  createTRPCNextBeta,
} from "@/@trpc/next-layout/client";
import { env } from "@/env";
import type { AppRouter } from "@/server/api/root";
import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

const getBaseUrl = () => {
  if (env.NEXT_PUBLIC_DOMAIN) return env.NEXT_PUBLIC_DOMAIN;
  if (typeof window !== "undefined") return ""; // browser should use relative url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/*
 * Create a client that can be used in the client only
 */

export const api = createTRPCNextBeta<AppRouter>({
  transformer: superjson,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: false,
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    },
  },
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      async headers() {
        const authToken = await window.Clerk.session.getToken();
        return {
          Authorization: authToken ?? undefined,
        };
      },
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

/*
 * A component used to hydrate the state from server to client
 */

export const HydrateClient = createHydrateClient({
  transformer: superjson,
});

declare global {
  interface Window {
    Clerk: any;
  }
}
