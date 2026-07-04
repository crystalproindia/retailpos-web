import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  accent: "bg-accent-500/10 text-accent-600 border-accent-500/20",
  ledger: "bg-ledger-500/10 text-ledger-600 border-ledger-500/20",
  neutral: "bg-paper text-ink-soft border-line",
} as const;

export function Badge({
  tone = "brand",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
