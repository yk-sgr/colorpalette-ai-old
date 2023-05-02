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
    return await ctx.prisma.palette.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      include: {
        colors: {
          include: {
            usages: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
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
      await ctx.prisma.palette.delete({
        where: {
          id: input.id,
        },
      });
    }),
  generate: protectedProcedure
    .input(z.object({ description: z.string().max(300).min(1) }))
    .mutation(async ({ ctx, input }) => {
      const start = new Date();
      const user = await ctx.prisma.user.upsert({
        where: {
          id: ctx.auth.userId,
        },
        create: {
          id: ctx.auth.userId,
        },
        update: {},
      });

      if (user.plan === "NONE" && user.invocations >= PLAN_NONE_MAX) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Out of invocations. Please upgrade your subscription.",
        });
      }

      console.log(prompt);

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: input.description },
        ],
      });
      if (
        completion.data.choices.length === 0 ||
        !completion.data.choices[0]?.message
      ) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Please try a different, more precise description.",
        });
      }

      try {
        const palette = JSON.parse(
          completion.data.choices[0].message.content.replaceAll("]}.", "]}").replaceAll("```", "")
        ) as GeneratePalette;
        await ctx.prisma.user.update({
          where: {
            id: ctx.auth.userId,
          },
          data: {
            invocations: user.invocations + 1,
          },
        });
        return await ctx.prisma.palette.create({
          include: {
            colors: {
              include: {
                usages: true,
              },
            },
          },
          data: {
            userId: ctx.auth.userId,
            input: input.description,
            description: input.description,
            name: new Date().toLocaleDateString(),
            colors: {
              create: palette.colors.map((color) => {
                return {
                  name: color.name,
                  hex: color.hex,
                  description: color.description,
                  usages: {
                    create: color.usages.map((usage) => {
                      return {
                        usage: usage.usage,
                      };
                    }),
                  },
                };
              }),
            },
          },
        });
        // JSON parse error
      } catch (err) {
        console.log(
          completion.data.choices[0].message.content.replaceAll("]}.", "]}")
        );
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error. Please try again.",
        });
      } finally {
        await ctx.prisma.invocationMetric.create({
          data: {
            time: new Date().getTime() - start.getTime(),
            inputLength: input.description.length,
            promptLength: prompt.length,
          },
        });
      }
    }),
});
