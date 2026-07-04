"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ShowcaseTab {
  label: string;
  summary: string;
  panel: React.ReactNode;
}

/**
 * Accessible tabs (WAI-ARIA pattern): roving tabindex, arrow/Home/End keys.
 * All panels are server-rendered and stay in the DOM (hidden), so the
 * explanatory content remains crawlable.
 */
export function ShowcaseTabs({ tabs }: { tabs: ShowcaseTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="RetailPOS product surfaces"
        className="flex flex-wrap justify-center gap-1.5"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === i
                ? "bg-brand-600 text-white shadow-card"
                : "border border-line bg-white text-ink-soft hover:border-brand-200 hover:text-brand-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
          className="mx-auto mt-8 max-w-3xl"
        >
          <p className="mb-4 text-center text-sm text-ink-muted">{tab.summary}</p>
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
