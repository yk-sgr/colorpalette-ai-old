import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_COLORS = [
  "Primary",
  "Secondary",
  "Light Shade",
  "Dark Shade",
  "Background",
  "Error",
  "Warning",
  "Success"
];
