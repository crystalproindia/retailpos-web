import { icons, CircleDot, type LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

/** Resolves a lucide icon by name so data files can stay serializable for the CMS. */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? CircleDot;
  return <LucideIcon aria-hidden="true" {...props} />;
}
