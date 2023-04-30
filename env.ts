import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_ENDPOINT_SECRET: z.string(),
    STRIPE_PRICE_PRO_PLAN: z.string(),
  },
  client: {
    NEXT_PUBLIC_DOMAIN: z.string(),
  },
  runtimeEnv: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
    STRIPE_PRICE_PRO_PLAN: process.env.STRIPE_PRICE_PRO_PLAN,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
});
