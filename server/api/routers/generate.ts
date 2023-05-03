import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import {z} from 'zod';
import {Configuration, OpenAIApi} from 'openai';
import process from 'process';
import {TRPCError} from '@trpc/server';
import {GeneratePalette} from '@/lib/types';

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

const generatePaletteInput = z.object({
  name: z.string().max(60, "Name must be at most 60 characters long.").nullable(),
  description: z.string().min(8, "Description must be at least 8 characters long.").max(540, "Description must be at most 540 characters long."),
  colors: z.array(z.string().min(3, "Color names must be at least 3 characters long.")).min(1, "You must at least add one color.").max(20, "You can only generate up to 20 colors.").default([]),
  usages: z.array(z.string().min(3, "Usages must be at least 3 characters long.")).max(20, "You can only specify up to 20 usages.").default([]),
  palette: z.enum(["MATERIAL", "TAILWIND", "FLAT", "CUSTOM"]).default("CUSTOM"),
});

const MAX_INVOCATIONS_FREE = 3;

export const generateRouter = createTRPCRouter({
  generatePalette: protectedProcedure.input(generatePaletteInput).mutation(async ({ctx, input}) => {
    const user = await ctx.prisma.user.upsert({
      where: {
        id: ctx.auth.userId,
      },
      create: {
        id: ctx.auth.userId,
      },
      update: {},
    });

    // Advanced Options / Paid Users
    if ((input.colors.length > 0 || input.usages.length > 0 || input.palette !== "CUSTOM") && user.plan === "NONE") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Advanced options are only available to paid users.",
      });
    }

    // Invocations / Paid Users
    if (user.plan === "NONE" && user.invocations >= MAX_INVOCATIONS_FREE) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You have reached the maximum number of invocations for your plan.",
      });
    }

    const gptInput = `
      The description of the website is: ${input.description}.

      Please generate at least the following colors:
      ${input.colors.map((color) => `- ${color}`).join("\n")}

      ${input.usages.length > 0 ? `I also want you to generate colors for the following usages: ${input.usages.map((usage) => `- ${usage}`).join("\n")} You can use colors defined above, or generate additional ones.` : ""}

      ${input.palette === "MATERIAL" ? "I want you to generate colors based on the Material Design color palette." : ""}
      ${input.palette === "TAILWIND" ? "I want you to generate colors based on the Tailwind CSS color palette." : ""}
      ${input.palette === "FLAT" ? "I want you to generate colors based on the Flat UI color palette." : ""}
    `;

    // Send prompt to OpenAI
    const completion = await openai().createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: prompt},
        {role: "user", content: gptInput},
      ],
    });

    // Check if response
    if (!completion.data.choices[0]?.message?.content) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Please try a different, more precise description.",
      });
    }

    // Strip possible invalid characters
    const text = completion.data.choices[0].message.content;
    let cleanResponse = text.replaceAll("]}.", "]}").replaceAll("```", "");
    cleanResponse = cleanResponse.substring(cleanResponse.indexOf("{"), cleanResponse.lastIndexOf("}") + 1);

    console.log(cleanResponse);

    try {
      // Update user invocations
      await ctx.prisma.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          invocations: user.invocations + 1,
        },
      });

      // Parse response
      const palette = JSON.parse(cleanResponse) as GeneratePalette;

      // Create palette
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
          description: input.description,
          name: input.name ?? new Date().toLocaleDateString(),
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
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Please try again. If this happens again, try a different description.",
      });
    } finally {
      // Record invocation
      await ctx.prisma.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          invocations: {
            increment: 1,
          },
        },
      });
    }
  }),
});

function openai() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return new OpenAIApi(configuration);
}
