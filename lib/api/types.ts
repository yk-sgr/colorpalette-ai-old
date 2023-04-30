import type { AppRouter } from "@/server/api/root";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
