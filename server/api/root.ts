import { colorsRouter } from "@/server/api/routers/colors";
import { palettesRouter } from "@/server/api/routers/palettes";
import { createTRPCRouter } from "@/server/api/trpc";
import {generateRouter} from '@/server/api/routers/generate';

export const appRouter = createTRPCRouter({
  palettes: palettesRouter,
  colors: colorsRouter,
  generate: generateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
