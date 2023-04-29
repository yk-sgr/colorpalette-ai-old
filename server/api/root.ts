import {createTRPCRouter} from '@/server/api/trpc';
import {palettesRouter} from '@/server/api/routers/palettes';
import {colorsRouter} from '@/server/api/routers/colors';

export const appRouter = createTRPCRouter({
  palettes: palettesRouter,
  colors: colorsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
