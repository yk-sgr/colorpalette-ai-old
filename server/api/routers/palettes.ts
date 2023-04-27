import {z} from "zod";
import {OpenAIApi, Configuration} from "openai";

import {TRPCError} from "@trpc/server";
import {createTRPCRouter, publicProcedure} from '@/server/api/trpc';
import * as process from 'process';
import {Color, Palette} from '@/lib/types';
import {ColorType} from '@prisma/client';

const promptExample: Palette = {
  "light": [
    {
      "name": "color name",
      "background": "the hex code of the background color (main color)",
      "foreground": "the hex code of the foreground colors (matching the background color)",
      "description": "The description of the color. Why did you choose it for this website? What does it convey?",
      "usage": [
        "Where the color can be used: for example",
        "Buttons",
        "Navbar etc.."
      ]
    }
  ],
  "dark": [
    {
      "name": "color name",
      "background": "the hex code of the background color (main color)",
      "foreground": "the hex code of the foreground colors (matching the background color)",
      "description": "The description of the color. Why did you choose it for this website? What does it convey?",
      "usage": [
        "Where the color can be used: for example",
        "Buttons", "Navbar etc.."
      ]
    }
  ]
}

const prompt = `
You are ColorPaletteAI, an AI expert in generating color palettes for websites based on website descriptions.
As a designer, create color palettes that complement each other and result in visually appealing websites.

Generate at least the following colors:
  - Primary
  - Secondary
  - Background Color
  - Light Shade
  - Dark Shade
  - Error Color

Create the same colors for a light mode and dark mode on the website.

IMPORTANT: Respond with a RFC8259 compliant JSON object ONLY. If the website description is unclear or invalid, return an empty JSON response: {}.
Provide an RFC8259 compliant JSON response in this format:

${JSON.stringify(promptExample)}
`;

const PLAN_NONE_MAX = 3;

export const palettesRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({description: z.string().max(300).min(1)}))
    .mutation(async ({ctx, input}) => {
      const start = new Date();
      if (ctx.auth === null || ctx.auth?.user === null || !ctx.auth?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login first.",
        });
      }

      const user = await ctx.prisma.user.upsert({
        where: {
          id: ctx.auth.userId,
        },
        create: {
          id: ctx.auth.userId,
        },
        update: {},
      })

      if (user.plan === "NONE" && user.invocations >= PLAN_NONE_MAX) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Out of invocations. Please upgrade your subscription."
        });
      }

      console.log(prompt)

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: prompt},
          {role: "user", content: input.description},
        ],
      });
      if (
        completion.data.choices.length === 0 ||
        !completion.data.choices[0]?.message
      ) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error. Please try a different, more precise description."
        });
      }

      try {
        const palette = JSON.parse(completion.data.choices[0].message.content.replaceAll("]}.", "]}")) as Palette;
        const colors: Color[] = [...palette.light.map((color) => {
          return {
            ...color,
            type: ColorType.LIGHT,
          }
        }),
          ...palette.dark.map((color) => {
            return {
              ...color,
              type: ColorType.DARK,
            }
          }),
        ];
        await ctx.prisma.user.update({
          where: {
            id: ctx.auth.userId,
          },
          data: {
            invocations: user.invocations + 1,
          }
        });
        await ctx.prisma.palette.create({
          data: {
            userId: ctx.auth.userId,
            input: input.description,
            name: new Date().toLocaleDateString(),
            colors: {
              create: colors.map((color) => {
                return {
                  name: color.name,
                  background: color.background,
                  foreground: color.foreground,
                  description: color.description,
                  type: color.type!,
                  usages: {
                    create: color.usage.map((usage) => {
                      return {
                        usage,
                      }
                    }),
                  }
                }
              }),
            },
          }
        });
        return {
          palette,
        };
        // JSON parse error
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error. Please try a different, more precise description."
        });
      } finally {
        await ctx.prisma.invocationMetric.create({
          data: {
            time: new Date().getTime() - start.getTime(),
            inputLength: input.description.length,
            promptLength: prompt.length,
          }
        })
      }
    }),
});
