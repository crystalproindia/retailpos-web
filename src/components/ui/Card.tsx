import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-lg border border-line bg-white p-6 shadow-card", className)}>
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

/** Icon + title + description card, optionally linked. Used across the site. */
export function FeatureCard({ icon, title, description, href, className }: FeatureCardProps) {
  const body = (
    <>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-brand-50 text-brand-600">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "group block rounded-lg border border-line bg-white p-6 shadow-card transition-shadow duration-150 hover:shadow-raised focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          className,
        )}
      >
        {body}
        <span className="mt-3 inline-block text-sm font-medium text-brand-600 group-hover:underline">
          Learn more
        </span>
      </Link>
    );
  }

  return <div className={cn("rounded-lg border border-line bg-white p-6 shadow-card", className)}>{body}</div>;
}
