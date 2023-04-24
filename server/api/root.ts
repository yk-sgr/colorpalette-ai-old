import {createTRPCRouter} from '@/server/api/trpc';
import {palettesRouter} from '@/server/api/routers/palettes';

export const appRouter = createTRPCRouter({
  palettes: palettesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
