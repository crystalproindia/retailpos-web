import type { LucideProps } from "lucide-react";
import { iconRegistry, fallbackIcon } from "./icon-registry";

interface IconProps extends LucideProps {
  name: string;
}

/** Resolves an icon by name from the static registry (tree-shakeable). */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = iconRegistry[name] ?? fallbackIcon;
  return <LucideIcon aria-hidden="true" {...props} />;
}
