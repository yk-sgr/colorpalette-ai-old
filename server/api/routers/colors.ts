import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const colorsRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const color = await ctx.prisma.color.findUnique({
        where: {
          id: input.id,
        },
        select: {
          usages: true,
          id: true,
          name: true,
          hex: true,
          description: true,
          palette: {
            select: {
              userId: true,
            },
          },
        },
      });
      if (!color) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Color not found.",
        });
      }
      if (color.palette.userId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this color.",
        });
      }
      return color;
    }),
});
