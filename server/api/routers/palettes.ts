import {z} from "zod";
import {OpenAIApi, Configuration} from "openai";

import {TRPCError} from "@trpc/server";
import {createTRPCRouter, publicProcedure} from '@/server/api/trpc';
import * as process from 'process';
import {Palette} from '@/lib/types';

const promptExample: Palette =
  {
    light: [
      {
        name: "Example Light Mode Color",
        foreground: "the hex code of the foreground colors",
        background: "the hex code of the background color",
        description: "The description of the color. Why did you choose it for this website? What does it convey?",
        usage: [
          "Where the color can be used: for example",
          "Buttons",
          "Navbar etc.."
        ]
      },
      {
        name: "Primary",
        background: "#4287f5",
        foreground: "#000000",
        description: "This is the primary color of your application. It conveys calmness, tranquility, and stability.",
        usage: [
          "Navigation Bar",
          "Buttons",
          "Links"
        ]
      },
    ],
    dark: [
      {
        name: "Example Dark Mode Color",
        foreground: "the hex code of the foreground colors",
        background: "the hex code of the background color",
        description: "The description of the color. Why did you choose it for this website? What does it convey?",
        usage: [
          "Where the color can be used: for example",
          "Buttons",
          "Navbar etc.."
        ]
      }
    ]
  };

const prompt = `
You are ColorPaletteAI, an AI expert in generating color palettes for websites based on website descriptions.
As a designer, create color palettes that complement each other and result in visually appealing websites.

Factor in the 2023 web design color trends and color psychology as you generate color palettes:
  - Bold, eye-catching colors like purple, fuchsia, red, yellow, and blue.
  - Metallics and silver chrome for glamour and luxury.
  - Soft, understated hues (Millennial Kitsch) like lavender, soft pink, mint, and blush.
  - Warm Mediterranean hues, including terra cottas, dusky reds and oranges, and tones of clay and ceramic pottery.
  - Modern monochrome color schemes with pops of dynamic colors.
  - Nature-inspired neutrals and pastels like soft creams, botanical greens, and pale pinks.
  - Dual-tone color schemes with abrupt changes for a striking effect.

IMPORTANT: Respond with a JSON object ONLY. If the website description is unclear or invalid, return an empty JSON response: {}.

Generate at least the following colors:
  - Primary
  - Secondary
  - Background Color
  - Light Shade
  - Dark Shade
  - Error Color

Provide an RFC8259 compliant JSON response in this format:

${JSON.stringify(promptExample)}
`;

export const palettesRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({description: z.string().max(300).min(1)}))
    .mutation(async ({ctx, input}) => {
      if (ctx.auth?.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login first.",
        });
      }
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

      console.log(completion.data.choices[0].message.content);

      try {
        const palette = JSON.parse(completion.data.choices[0].message.content.replaceAll("]}.", "]}")) as Palette;
        return {
          palette,
        };

        // JSON parse error
      } catch (_) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error. Please try a different, more precise description."
        });
      }
    }),
});
