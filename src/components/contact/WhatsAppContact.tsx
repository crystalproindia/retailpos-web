"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  buildWhatsAppHref,
  getWhatsAppContacts,
  type WhatsAppContactOption,
  type WhatsAppPageContext,
} from "@/lib/whatsapp";

type WhatsAppSource = "floating" | "mobile_nav";

interface WhatsAppCountrySelectorProps {
  source: WhatsAppSource;
  compact?: boolean;
  className?: string;
  contacts?: WhatsAppContactOption[];
  defaultMessage?: string;
  onNavigate?: () => void;
}

function currentPageContext(): WhatsAppPageContext {
  if (typeof window === "undefined") return {};

  return {
    pageTitle: document.title,
    pageUrl: window.location.href,
    route: window.location.pathname,
  };
}

export function WhatsAppCountrySelector({
  source,
  compact = false,
  className,
  contacts,
  defaultMessage,
  onNavigate,
}: WhatsAppCountrySelectorProps) {
  const contactOptions = useMemo(() => {
    if (!contacts?.length) return getWhatsAppContacts();
    return contacts.some((contact) => contact.available) ? contacts : getWhatsAppContacts();
  }, [contacts]);

  return (
    <div className={cn("space-y-2", className)} aria-label="Choose WhatsApp country">
      {contactOptions.map((contact) => {
        const href = contact.available ? buildWhatsAppHref(contact.number, {}, defaultMessage) : null;

        return (
          <div
            key={contact.countryCode}
            className={cn(
              "rounded-lg border border-line bg-white p-3",
              compact ? "shadow-none" : "shadow-card",
            )}
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-50 font-mono text-xs font-semibold text-brand-700">
                {contact.countryCode}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">{contact.country}</p>
                    <p className="text-xs text-ink-muted">{contact.city}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                      contact.available ? "bg-ledger-500/10 text-ledger-600" : "bg-paper text-ink-muted",
                    )}
                  >
                    {contact.available ? "Available" : "Coming soon"}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  {contact.numberDisplay ?? contact.status}
                </p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Chat with RetailPOS ${contact.country} on WhatsApp`}
                    onClick={(event) => {
                      const contextualHref = buildWhatsAppHref(contact.number, currentPageContext(), defaultMessage);
                      if (contextualHref) event.currentTarget.href = contextualHref;
                      trackEvent("whatsapp_country_selected", {
                        source,
                        country: contact.country,
                        available: true,
                      });
                      if (source === "mobile_nav") {
                        trackEvent("whatsapp_mobile_nav_click", {
                          country: contact.country,
                          action: "open_whatsapp",
                        });
                      }
                      onNavigate?.();
                    }}
                    className="mt-3 inline-flex h-9 items-center justify-center rounded bg-brand-600 px-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                  >
                    Chat on WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="mt-3 inline-flex h-9 cursor-not-allowed items-center justify-center rounded border border-line bg-paper px-3 text-sm font-medium text-ink-muted"
                  >
                    WhatsApp number coming soon
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FloatingWhatsApp({
  contacts,
  defaultMessage,
}: {
  contacts?: WhatsAppContactOption[];
  defaultMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 flex flex-col items-end sm:right-6 lg:bottom-6"
    >
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="WhatsApp country selector"
          className="mb-3 w-[min(calc(100vw-2rem),24rem)] rounded-lg border border-line bg-white p-4 shadow-menu"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                WhatsApp
              </p>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink">Choose your region</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                We will include this page context in the WhatsApp message.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close WhatsApp selector"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded text-ink hover:bg-paper"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <WhatsAppCountrySelector source="floating" className="mt-4" contacts={contacts} defaultMessage={defaultMessage} />
        </div>
      ) : null}
      <button
        type="button"
        aria-label={open ? "Close WhatsApp contact options" : "Open WhatsApp contact options"}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => {
          const nextOpen = !open;
          setOpen(nextOpen);
          if (nextOpen) trackEvent("whatsapp_floating_click", { action: "open_selector" });
        }}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ledger-600 text-white shadow-menu transition duration-150 hover:-translate-y-0.5 hover:bg-ledger-500 focus-visible:ring-2 focus-visible:ring-ledger-600 focus-visible:ring-offset-2"
      >
        <MessageCircle aria-hidden="true" className="h-6 w-6" />
      </button>
    </div>
  );
}
