import {z} from "zod";
import {OpenAIApi, Configuration} from "openai";

import {TRPCError} from "@trpc/server";
import {createTRPCRouter, publicProcedure} from '@/server/api/trpc';
import * as process from 'process';
import {Palette} from '@/lib/types';

const promptExample: Palette =
  {
    colors: [
      {
        name: "Example",
        hex: "#ffffff",
        description: "The description of the color. Why did you choose it for this website? What does it convey?",
        usage: [
          "Where the color can be used: for example",
          "Buttons",
          "Navbar etc.."
        ]
      },
      {
        name: "Primary",
        hex: "#4287f5",
        description: "This is the primary color of your application. It conveys calmness, tranquility, and stability.",
        usage: [
          "Navigation Bar",
          "Buttons",
          "Links"
        ]
      },
      {
        name: "Secondary",
        hex: "#3bebaa",
        description: "This is the secondary color of your application.",
        usage: [
          "Secondary Buttons",
          "Accent Elements",
          "Highlighting",
          "Hover and active states"
        ]
      },
      {
        name: "Error",
        hex: "#eb443b",
        description: "The error color for your website.",
        usage: [
          "Error messages and destructive buttons",
        ]
      },
      {
        name: "Light Shade",
        hex: "#d9d7d7",
        description: "A light shade that does xxx",
        usage: [
          "component x y",
        ]
      }
    ]
  };

const prompt = `
You are ColorPaletteAI. Your sole and only purpose is to generate color palettes from a website description.
You have to think like a designer.
You are going to generate colors that fit best to the product.
The colors must match together. We don't like ugly websites.
You HAVE to respond in JSON format. If you do not respond in JSON format, the response can not be accepted.
You must not add any additional text to the response, except the one and only JSON object.
You are going to add at least the following colors:
- Primary
- Secondary
- Background Color
- Light Shade
- Dark Shade
- Error Color

The JSON response must look like the following:
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
          message: "There was an error. Please try again."
        });
      }

      console.log(completion.data.choices[0].message.content);

      try {
        const palette = JSON.parse(completion.data.choices[0].message.content) as Palette;
        return {
          palette,
        };

      // JSON parse error
      } catch (_) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error. Please try again."
        });
      }
    }),
});
