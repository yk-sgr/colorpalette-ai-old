import * as process from "process";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";

import { GeneratePalette, Palette } from "@/lib/types";

const promptExample: GeneratePalette = {
  colors: [
    {
      name: "color name",
      hex: "the hex code of the color",
      description:
        "The description of the color. Why did you choose it for this website? What does it convey?",
      usages: [
        {
          usage:
            "Where the color can be used: for example buttons, navbar, etc.",
        },
      ],
    },
  ],
};

const prompt = `
You are ColorPaletteAI, an AI expert in generating color palettes for websites based on website descriptions.
As a designer, create color palettes that complement each other and result in visually appealing websites.

Generate at least the following colors:
  - Primary (main color for buttons, links, and accents, etc.)
  - Secondary (alternative color for buttons, links, and accents, etc.)
  - Background Color (main color for website background, etc.)
  - Light Shade (used for hover effects and highlights, etc.)
  - Dark Shade (used for text and UI elements, etc.)
  - Error Color (used for error messages and alerts, etc.)

IMPORTANT: Respond with a RFC8259 compliant JSON object ONLY. If the website description is unclear or invalid, return an empty JSON response: {}.
Provide an RFC8259 compliant JSON response in this format:

${JSON.stringify(promptExample)}
`;

const PLAN_NONE_MAX = 3;

export const palettesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const palettes =  await ctx.prisma.palette.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        isFavorite: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return palettes.sort((a, b) => a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1);
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const palette = await ctx.prisma.palette.findUnique({
        where: {
          id: input.id,
        },
        include: {
          colors: {
            include: {
              usages: true,
            },
          },
        },
      });
      if (!palette) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Palette not found.",
        });
      }
      if (palette.userId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this palette.",
        });
      }
      return palette;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const palette = await ctx.prisma.palette.findUnique({
        where: {
          id: input.id,
        },
        select: {
          userId: true,
        },
      });
      if (!palette) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Palette not found.",
        });
      }
      if (palette.userId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this palette.",
        });
      }

      // Delete palette
      await ctx.prisma.palette.delete({
        where: {
          id: input.id,
        },
      });
    }),
  favorize: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const palette = await ctx.prisma.palette.findUnique({ where: { id: input.id } });

    // Check if palette exists
    if (!palette) throw new TRPCError({ code: "NOT_FOUND", message: "Palette not found." });

    // Check if palette is owned by user
    if (palette.userId !== ctx.auth.userId) throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not the owner of this palette." });

    // Check if palette is already favorized
    if (palette.isFavorite) throw new TRPCError({ code: "BAD_REQUEST", message: "Palette is already favorized." });

    // Update palette
    await ctx.prisma.palette.update({ where: { id: input.id }, data: { isFavorite: true } });
  }),
  unfavorize: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const palette = await ctx.prisma.palette.findUnique({ where: { id: input.id } });

    // Check if palette exists
    if (!palette) throw new TRPCError({ code: "NOT_FOUND", message: "Palette not found." });

    // Check if palette is owned by user
    if (palette.userId !== ctx.auth.userId) throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not the owner of this palette." });

    // Check if palette is favorized
    if (!palette.isFavorite) throw new TRPCError({ code: "BAD_REQUEST", message: "Palette is not favorized." });

    // Update palette
    await ctx.prisma.palette.update({ where: { id: input.id }, data: { isFavorite: false } });
  }),
});
