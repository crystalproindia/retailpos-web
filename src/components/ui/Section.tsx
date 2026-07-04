import { cn } from "@/lib/utils";
import { Container } from "./Container";

const tones = {
  white: "bg-white",
  paper: "bg-paper",
  ink: "bg-ink text-white",
  brand: "bg-brand-800 text-white",
} as const;

interface SectionProps {
  id?: string;
  tone?: keyof typeof tones;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

/** Standard page section with consistent vertical rhythm. */
export function Section({ id, tone = "white", className, containerClassName, children, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
