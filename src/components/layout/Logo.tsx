import Link from "next/link";

export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="RetailPOS.biz home"
      className="inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8">
        <rect width="32" height="32" rx="7" className="fill-brand-600" />
        {/* barcode mark */}
        <g className="fill-white">
          <rect x="8" y="9" width="2.5" height="14" />
          <rect x="12.5" y="9" width="1.5" height="14" />
          <rect x="16" y="9" width="3.5" height="14" />
          <rect x="21.5" y="9" width="1.5" height="14" />
        </g>
        <rect x="8" y="25" width="15" height="1.6" rx="0.8" className="fill-accent-500" />
      </svg>
      <span className={`font-display text-lg font-bold tracking-tight ${invert ? "text-white" : "text-ink"}`}>
        RetailPOS<span className="text-accent-500">.biz</span>
      </span>
    </Link>
  );
}
