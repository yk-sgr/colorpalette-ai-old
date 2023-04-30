import { createContextInner } from "@/server/api/context";
import { appRouter } from "@/server/api/root";
import { getAuth } from "@clerk/nextjs/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext(opts) {
    const auth = getAuth(opts.req);
    return createContextInner({
      req: opts.req,
      auth,
    });
  },
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
