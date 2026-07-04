"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navGroups, quickLinks, topLevelLinks } from "@/data/navigation";
import { primaryCtas } from "@/data/ctas";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { useScrollLock } from "@/hooks/useScrollLock";
import { Logo } from "./Logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile navigation designed to showcase the entire site:
 * quick-access row, accordion sections mirroring the mega menu (every
 * major page reachable in two taps), featured highlights, and a sticky
 * bottom conversion bar that stays visible while scrolling.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(navGroups[0]?.label ?? null);
  const prefersReducedMotion = useReducedMotion();
  useScrollLock(open);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: "8%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: "8%" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          {/* Top bar */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded text-ink hover:bg-paper"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto overscroll-contain pb-4">
            {/* Quick access row */}
            <div className="grid grid-cols-3 gap-2 border-b border-line p-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-line bg-paper py-3 text-xs font-medium text-ink transition-colors hover:border-brand-200 hover:bg-brand-50"
                >
                  {link.icon ? <Icon name={link.icon} className="h-5 w-5 text-brand-600" /> : null}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Accordion sections mirroring the mega menu */}
            <ul>
              {navGroups.map((group) => {
                const isOpen = expanded === group.label;
                const panelId = `mnav-${group.label.toLowerCase()}`;
                return (
                  <li key={group.label} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : group.label)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left"
                    >
                      <span>
                        <span className="block font-display text-base font-semibold text-ink">{group.label}</span>
                        <span className="mt-0.5 block text-xs text-ink-muted">{group.tagline}</span>
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("h-5 w-5 shrink-0 text-ink-muted transition-transform", isOpen && "rotate-180")}
                      />
                    </button>

                    <div id={panelId} hidden={!isOpen} className="px-4 pb-4">
                      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className={cn(
                                "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                                link.featured
                                  ? "border-brand-200 bg-brand-50"
                                  : "border-transparent hover:border-line hover:bg-paper",
                              )}
                            >
                              {link.icon ? (
                                <span
                                  className={cn(
                                    "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded",
                                    link.featured ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600",
                                  )}
                                >
                                  <Icon name={link.icon} className="h-4 w-4" />
                                </span>
                              ) : null}
                              <span>
                                <span className="flex items-center gap-2 text-sm font-medium text-ink">
                                  {link.label}
                                  {link.featured ? (
                                    <span className="rounded-full bg-accent-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-600">
                                      Popular
                                    </span>
                                  ) : null}
                                </span>
                                {link.description ? (
                                  <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-ink-muted">
                                    {link.description}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {group.secondary ? (
                        <div className="mt-3 rounded-lg bg-paper p-3">
                          <p className="px-1 font-mono text-[10px] font-medium uppercase tracking-widest text-ink-muted">
                            {group.secondary.title}
                          </p>
                          <ul className="mt-2 grid grid-cols-2 gap-1">
                            {group.secondary.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={onClose}
                                  className="flex items-center gap-2 rounded px-2 py-2 text-sm text-ink-soft hover:bg-white hover:text-brand-700"
                                >
                                  {link.icon ? <Icon name={link.icon} className="h-4 w-4 text-brand-600" /> : null}
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      <Link
                        href={group.href}
                        onClick={onClose}
                        className="mt-3 inline-block text-sm font-medium text-brand-600 underline-offset-2 hover:underline"
                      >
                        View all {group.label.toLowerCase()} →
                      </Link>
                    </div>
                  </li>
                );
              })}
              {topLevelLinks.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-4 py-4 font-display text-base font-semibold text-ink hover:bg-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky conversion bar */}
          <div className="shrink-0 border-t border-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="grid grid-cols-2 gap-2">
              <ButtonLink href={primaryCtas.bookDemo.href} onClick={onClose} size="lg">
                {primaryCtas.bookDemo.label}
              </ButtonLink>
              <ButtonLink href={primaryCtas.talkToSales.href} onClick={onClose} variant="ghost" size="lg">
                {primaryCtas.talkToSales.label}
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
