import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
  as?: "h2" | "h3";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em]",
            invert ? "text-brand-200" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={cn("font-display text-display-md font-semibold sm:text-display-lg", invert ? "text-white" : "text-ink")}>
        {title}
      </Tag>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-brand-100" : "text-ink-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
