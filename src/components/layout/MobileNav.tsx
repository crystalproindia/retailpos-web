"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Modal mobile navigation designed to showcase the entire site:
 * quick-access row, accordion sections mirroring the mega menu (every
 * major page reachable in two taps), featured highlights, and a sticky
 * bottom conversion bar that stays visible while scrolling.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(navGroups[0]?.label ?? null);
  const mounted = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  useScrollLock(open);

  useEffect(() => {
    if (!open || !mounted) return;
    closeButtonRef.current?.focus();
  }, [mounted, open]);

  function trapFocus(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(","),
    ) ?? []).filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const drawer = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-ink/35 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            id="mobile-nav"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-menu"
            onKeyDown={trapFocus}
          >
            {/* Top bar */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded text-ink hover:bg-paper"
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
                  key={`${link.label}-${link.href}`}
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(drawer, document.body);
}
