import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes so later ones win cleanly — `cn("p-2", "p-4")`
 * gives you `p-4`, not both. Every shadcn and Magic UI component imports this.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
