import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <p className="mx-auto flex max-w-site items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <span className="hidden font-mono uppercase tracking-widest text-brand-200 sm:inline">New</span>
        <span>AI demand forecasting is now part of RetailPOS.</span>
        <Link href="/products/ai-retail" className="inline-flex items-center gap-1 font-medium text-accent-400 hover:underline">
          See AI Retail <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </p>
    </div>
  );
}
