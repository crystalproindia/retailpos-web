"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navGroups as staticNavGroups, topLevelLinks as staticTopLevelLinks, quickLinks as staticQuickLinks } from "@/data/navigation";
import { primaryCtas } from "@/data/ctas";
import type { NavGroup, NavLink } from "@/types/content";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { TalkToSalesButton } from "@/components/forms/TalkToSalesModal";
import type { WhatsAppContactOption } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  navGroups?: NavGroup[];
  topLevelLinks?: NavLink[];
  quickLinks?: NavLink[];
  whatsAppContacts?: WhatsAppContactOption[];
  defaultWhatsAppMessage?: string;
}

export function Header({
  navGroups = staticNavGroups,
  topLevelLinks = staticTopLevelLinks,
  quickLinks = staticQuickLinks,
  whatsAppContacts,
  defaultWhatsAppMessage,
}: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const hadMobileOpenRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // Close mega menu on escape or outside click.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    if (hadMobileOpenRef.current && !mobileOpen) {
      mobileButtonRef.current?.focus();
    }
    hadMobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  const activeGroup = navGroups.find((g) => g.label === openMenu);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <nav ref={navRef} aria-label="Main" className="relative mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navGroups.map((group) => {
            const expanded = openMenu === group.label;
            return (
              <button
                key={group.label}
                type="button"
                aria-expanded={expanded}
                aria-haspopup="true"
                aria-controls={expanded ? `mega-menu-${group.label.toLowerCase()}` : undefined}
                onClick={() => setOpenMenu(expanded ? null : group.label)}
                className={cn(
                  "inline-flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors",
                  expanded ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-paper hover:text-ink",
                )}
              >
                {group.label}
                <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
              </button>
            );
          })}
          {topLevelLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <TalkToSalesButton trigger="desktop_nav" variant="ghost" size="sm">
            {primaryCtas.talkToSales.label}
          </TalkToSalesButton>
          <ButtonLink href={primaryCtas.bookDemo.href} size="sm">
            {primaryCtas.bookDemo.label}
          </ButtonLink>
        </div>

        {/* Mobile trigger */}
        <button
          ref={mobileButtonRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded text-ink lg:hidden"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>

        {/* Mega menu panel */}
        <AnimatePresence>
          {activeGroup ? (
            <motion.div
              id={`mega-menu-${activeGroup.label.toLowerCase()}`}
              key={activeGroup.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.16 }}
              className="absolute inset-x-4 top-full z-50 mt-2 hidden max-h-[min(34rem,calc(100vh-9rem))] overflow-y-auto overscroll-contain rounded-lg border border-line bg-white p-6 shadow-menu lg:block"
            >
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <p className="text-sm text-ink-muted">{activeGroup.tagline}</p>
                <Link
                  href={activeGroup.href}
                  onClick={() => setOpenMenu(null)}
                  className="text-sm font-medium text-brand-600 hover:underline"
                >
                  View all {activeGroup.label.toLowerCase()}
                </Link>
              </div>
              <div className={cn("mt-4 grid gap-6", activeGroup.secondary ? "grid-cols-[2fr,1fr]" : "grid-cols-1")}>
                {activeGroup.sections ? (
                  <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
                    {activeGroup.sections.map((section) => (
                      <div key={section.title}>
                        <p className="px-3 font-mono text-[10px] font-medium uppercase tracking-widest text-ink-muted">
                          {section.title}
                        </p>
                        <ul className="mt-2 space-y-0.5">
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setOpenMenu(null)}
                                className="flex items-center gap-2 rounded px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-paper hover:text-brand-700"
                              >
                                {link.icon ? <Icon name={link.icon} className="h-4 w-4 shrink-0 text-brand-600" /> : null}
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                <ul className="grid grid-cols-2 gap-1 xl:grid-cols-3">
                  {activeGroup.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpenMenu(null)}
                        className={cn(
                          "group flex gap-3 rounded p-3 transition-colors hover:bg-paper",
                          link.featured && "bg-brand-50/60",
                        )}
                      >
                        {link.icon ? (
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-50 text-brand-600">
                            <Icon name={link.icon} className="h-4 w-4" />
                          </span>
                        ) : null}
                        <span>
                          <span className="block text-sm font-medium text-ink group-hover:text-brand-700">
                            {link.label}
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
                )}
                {activeGroup.secondary ? (
                  <div className="rounded-lg bg-paper p-4">
                    <p className="font-mono text-xs font-medium uppercase tracking-widest text-ink-muted">
                      {activeGroup.secondary.title}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {activeGroup.secondary.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-white hover:text-brand-700"
                          >
                            {link.icon ? <Icon name={link.icon} className="h-4 w-4 text-brand-600" /> : null}
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navGroups={navGroups}
        topLevelLinks={topLevelLinks}
        quickLinks={quickLinks}
        whatsAppContacts={whatsAppContacts}
        defaultWhatsAppMessage={defaultWhatsAppMessage}
      />
    </header>
  );
}
