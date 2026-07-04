import type { Stat } from "@/types/content";

/**
 * PLACEHOLDER metrics — structured for replacement from the admin panel.
 * These describe measurable product outcomes, not rankings or awards.
 */
export const outcomeStats: Stat[] = [
  { value: "40%", label: "less time spent on stock audits", placeholder: true },
  { value: "3 sec", label: "average time to bill an item", placeholder: true },
  { value: "99.9%", label: "billing uptime target with offline mode", placeholder: true },
  { value: "1 day", label: "typical go-live for a single store", placeholder: true },
];
