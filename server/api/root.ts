import { colorsRouter } from "@/server/api/routers/colors";
import { palettesRouter } from "@/server/api/routers/palettes";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  palettes: palettesRouter,
  colors: colorsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
