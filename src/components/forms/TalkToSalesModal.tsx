"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, LoaderCircle, MessageCircle, Search, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox, FieldWrap, TextInput } from "@/components/forms/fields";
import { countryOptions, type CountryOption } from "@/data/countries";
import { contactConfig } from "@/config/contact";
import { useScrollLock } from "@/hooks/useScrollLock";
import { trackEvent } from "@/lib/analytics";
import {
  getLeadTrackingContext,
  isValidEmail,
  sanitizeLeadText,
  submitWebsiteLead,
} from "@/lib/lead-client";
import { buildWhatsAppHref, getWhatsAppContacts, type WhatsAppContactOption } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface TalkToSalesContextValue {
  openTalkToSales: (trigger?: string) => void;
}

interface TalkToSalesProviderProps {
  children: React.ReactNode;
  whatsAppContacts?: WhatsAppContactOption[];
  defaultWhatsAppMessage?: string;
}

type TalkToSalesButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  trigger?: string;
};

interface Values {
  name: string;
  phone: string;
  email: string;
  whatsappPreferred: boolean;
  website: string;
}

type Errors = Partial<Record<"phone" | "email", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const TalkToSalesContext = createContext<TalkToSalesContextValue | null>(null);
const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
const india = countryOptions.find((country) => country.code === "IN") ?? countryOptions[0];

function flagFor(code: string): string {
  if (!/^[A-Z]{2}$/.test(code) || code === "XX") return "";
  return String.fromCodePoint(...code.split("").map((letter) => 127397 + letter.charCodeAt(0)));
}

function emptyValues(): Values {
  return {
    name: "",
    phone: "",
    email: "",
    whatsappPreferred: false,
    website: "",
  };
}

function getFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(","),
    ),
  ).filter((element) => element.offsetParent !== null);
}

function normalizePhoneNumber(rawPhone: string, country: CountryOption): { phone?: string; error?: string } {
  const dialDigits = country.dialCode.replace(/\D/g, "");
  const raw = rawPhone.trim();
  let digits = raw.replace(/\D/g, "");

  if (!country.dialCode || !dialDigits) return { error: "Choose a country with a valid dial code." };
  if (!digits) return { error: "Enter your mobile number." };
  if (digits.startsWith("00")) digits = digits.slice(2);

  if (raw.startsWith("+")) {
    if (!digits.startsWith(dialDigits)) {
      return { error: `Select the matching country code for ${country.dialCode}.` };
    }
  } else {
    digits = `${dialDigits}${digits.replace(/^0+/, "")}`;
  }

  if (digits.length < 8 || digits.length > 15) {
    return { error: "Enter a valid international mobile number." };
  }

  return { phone: `+${digits}` };
}

function selectedWhatsAppHref(
  country: CountryOption,
  contacts: WhatsAppContactOption[] | undefined,
  defaultMessage: string | undefined,
) {
  const options = contacts?.length ? contacts : getWhatsAppContacts();
  const contact = options.find((option) => option.countryCode === country.code && option.available);
  if (!contact?.number) return null;

  return buildWhatsAppHref(
    contact.number,
    {
      pageTitle: typeof document !== "undefined" ? document.title : undefined,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      route: typeof window !== "undefined" ? window.location.pathname : undefined,
    },
    defaultMessage ?? contactConfig.defaultWhatsAppMessage,
  );
}

export function TalkToSalesProvider({
  children,
  whatsAppContacts,
  defaultWhatsAppMessage,
}: TalkToSalesProviderProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Values>(() => emptyValues());
  const [errors, setErrors] = useState<Errors>({});
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(india);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const mounted = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);
  const titleId = useId();
  const descriptionId = useId();
  const countryListId = useId();
  const prefersReducedMotion = useReducedMotion();
  useScrollLock(open);

  const filteredCountries = useMemo(() => {
    const search = countrySearch.trim().toLowerCase();
    if (!search) return countryOptions;

    return countryOptions.filter((country) => {
      return (
        country.name.toLowerCase().includes(search) ||
        country.code.toLowerCase().includes(search) ||
        country.dialCode.includes(search)
      );
    });
  }, [countrySearch]);

  const whatsappHref = status === "success"
    ? selectedWhatsAppHref(selectedCountry, whatsAppContacts, defaultWhatsAppMessage)
    : null;

  function openTalkToSales(trigger = "cta") {
    setValues(emptyValues());
    setErrors({});
    setStatus("idle");
    setSelectedCountry(india);
    setCountryOpen(false);
    setCountrySearch("");
    setOpen(true);
    trackEvent("talk_to_sales_open", {
      trigger,
      route: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }

  function closeModal() {
    if (status === "submitting") return;
    setOpen(false);
    setCountryOpen(false);
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "phone" && errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
    if (key === "email" && errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  }

  function chooseCountry(country: CountryOption) {
    setSelectedCountry(country);
    setCountryOpen(false);
    setCountrySearch("");
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
    trackEvent("talk_to_sales_country_changed", {
      country: country.name,
      country_code: country.code,
      dial_code: country.dialCode,
    });
    phoneRef.current?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || status === "submitting") return;

    if (values.website) {
      setStatus("success");
      return;
    }

    const nextErrors: Errors = {};
    const normalized = normalizePhoneNumber(values.phone, selectedCountry);
    const email = sanitizeLeadText(values.email, 200).toLowerCase();

    if (normalized.error || !normalized.phone) nextErrors.phone = normalized.error ?? "Enter your mobile number.";
    if (email && !isValidEmail(email)) nextErrors.email = "Enter a valid email address.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    submittingRef.current = true;
    setStatus("submitting");
    trackEvent("talk_to_sales_submit", {
      country: selectedCountry.name,
      country_code: selectedCountry.code,
      whatsapp_preferred: values.whatsappPreferred,
    });

    try {
      const tracking = getLeadTrackingContext();
      await submitWebsiteLead({
        name: sanitizeLeadText(values.name, 160),
        company_name: "",
        email,
        phone: normalized.phone,
        city: "",
        country: selectedCountry.name,
        business_type: "",
        requirement: values.whatsappPreferred
          ? "Talk to Sales popup enquiry. Contact me on WhatsApp."
          : "Talk to Sales popup enquiry.",
        source: "talk_to_sales_popup",
        ...tracking,
        metadata: {
          country_code: selectedCountry.code,
          dial_code: selectedCountry.dialCode,
          whatsapp_preferred: values.whatsappPreferred,
          consent_to_contact: true,
        },
        website: values.website,
      });
      setStatus("success");
      trackEvent("talk_to_sales_success", {
        country: selectedCountry.name,
        country_code: selectedCountry.code,
      });
    } catch {
      setStatus("error");
      trackEvent("talk_to_sales_error", {
        country: selectedCountry.name,
        country_code: selectedCountry.code,
      });
    } finally {
      submittingRef.current = false;
    }
  }

  useEffect(() => {
    if (!open || !mounted) return;

    const timer = window.setTimeout(() => {
      if (status === "success") {
        closeButtonRef.current?.focus();
      } else {
        phoneRef.current?.focus();
      }
    }, 40);

    return () => window.clearTimeout(timer);
  }, [mounted, open, status]);

  useEffect(() => {
    if (!countryOpen) return;
    const timer = window.setTimeout(() => countrySearchRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [countryOpen]);

  function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable(dialogRef.current);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const dialog = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 px-3 py-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="max-h-[calc(100vh-1rem)] w-full max-w-lg overflow-y-auto rounded-t-lg border border-line bg-white shadow-menu sm:max-h-[calc(100vh-3rem)] sm:rounded-lg"
            onKeyDown={trapFocus}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-600">
                  Sales consultation
                </p>
                <h2 id={titleId} className="mt-1 font-display text-2xl font-semibold text-ink">
                  Talk to Sales
                </h2>
                <p id={descriptionId} className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Share your mobile number and our team will help map RetailPOS to your store setup.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close Talk to Sales form"
                disabled={status === "submitting"}
                onClick={closeModal}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded text-ink hover:bg-paper disabled:pointer-events-none disabled:opacity-50"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-5 sm:px-6">
              {status === "success" ? (
                <div role="status" className="text-center">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-ledger-500/10 text-ledger-600">
                    <Check aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    Thank you. Our sales team will contact you shortly.
                  </h3>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button type="button" onClick={closeModal}>
                      Close
                    </Button>
                    {whatsappHref ? (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded border border-brand-200 px-5 text-sm font-medium text-brand-700 transition-colors hover:border-brand-400 hover:bg-brand-50"
                      >
                        <MessageCircle aria-hidden="true" className="h-4 w-4" />
                        WhatsApp {selectedCountry.name}
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
                  <FieldWrap label="Name" htmlFor="talk-sales-name">
                    <TextInput
                      id="talk-sales-name"
                      autoComplete="name"
                      value={values.name}
                      disabled={status === "submitting"}
                      onChange={(event) => update("name", event.target.value)}
                    />
                  </FieldWrap>

                  <div>
                    <label id="talk-sales-country-label" className="mb-1.5 block text-sm font-medium text-ink">
                      Mobile number <span className="text-accent-600">*</span>
                    </label>
                    <div className="grid grid-cols-[minmax(8.5rem,11rem),1fr] gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={countryOpen}
                          aria-controls={countryOpen ? countryListId : undefined}
                          aria-labelledby="talk-sales-country-label talk-sales-country-button"
                          disabled={status === "submitting"}
                          onClick={() => setCountryOpen((prev) => !prev)}
                          className="flex h-11 w-full items-center justify-between gap-2 rounded border border-line bg-white px-3 text-left text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:opacity-60"
                        >
                          <span id="talk-sales-country-button" className="min-w-0 truncate">
                            <span aria-hidden="true" className="mr-1.5">
                              {flagFor(selectedCountry.code)}
                            </span>
                            {selectedCountry.dialCode}
                          </span>
                          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-muted" />
                        </button>

                        {countryOpen ? (
                          <div
                            id={countryListId}
                            role="listbox"
                            aria-label="Choose country dial code"
                            className="absolute left-0 top-full z-20 mt-2 max-h-72 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-line bg-white shadow-menu"
                          >
                            <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                              <Search aria-hidden="true" className="h-4 w-4 text-ink-muted" />
                              <input
                                ref={countrySearchRef}
                                type="search"
                                aria-label="Search countries"
                                value={countrySearch}
                                onChange={(event) => setCountrySearch(event.target.value)}
                                className="h-9 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                                placeholder="Search country or dial code"
                              />
                            </div>
                            <div className="max-h-56 overflow-y-auto py-1">
                              {filteredCountries.length ? (
                                filteredCountries.map((country) => (
                                  <button
                                    key={`${country.code}-${country.name}`}
                                    type="button"
                                    role="option"
                                    aria-selected={selectedCountry.code === country.code}
                                    onClick={() => chooseCountry(country)}
                                    className={cn(
                                      "flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-paper",
                                      selectedCountry.code === country.code && "bg-brand-50 text-brand-700",
                                    )}
                                  >
                                    <span aria-hidden="true" className="w-5 text-center">
                                      {flagFor(country.code)}
                                    </span>
                                    <span className="min-w-0 flex-1 truncate">{country.name}</span>
                                    <span className="font-mono text-xs text-ink-muted">{country.dialCode}</span>
                                  </button>
                                ))
                              ) : (
                                <p className="px-3 py-4 text-sm text-ink-muted">No countries found.</p>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <TextInput
                        ref={phoneRef}
                        id="talk-sales-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={values.phone}
                        error={errors.phone}
                        disabled={status === "submitting"}
                        placeholder="80726 82244"
                        onChange={(event) => update("phone", event.target.value)}
                      />
                    </div>
                    {errors.phone ? (
                      <p id="talk-sales-phone-error" role="alert" className="mt-1.5 text-xs text-red-600">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>

                  <FieldWrap label="Email" htmlFor="talk-sales-email" error={errors.email}>
                    <TextInput
                      id="talk-sales-email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      error={errors.email}
                      disabled={status === "submitting"}
                      onChange={(event) => update("email", event.target.value)}
                    />
                  </FieldWrap>

                  <Checkbox
                    id="talk-sales-whatsapp"
                    checked={values.whatsappPreferred}
                    disabled={status === "submitting"}
                    onChange={(event) => update("whatsappPreferred", event.target.checked)}
                    label="Contact me on WhatsApp"
                  />

                  <p className="text-xs leading-relaxed text-ink-muted">
                    By submitting, you agree to be contacted by RetailPOS.
                  </p>

                  <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="talk-sales-website">Website</label>
                    <input
                      id="talk-sales-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      name="website"
                      onChange={(event) => update("website", event.target.value)}
                    />
                  </div>

                  {status === "error" ? (
                    <p role="alert" className="flex items-start gap-2 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                      We couldn&apos;t submit your request right now. Please try again or contact us on WhatsApp.
                    </p>
                  ) : null}

                  <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full">
                    {status === "submitting" ? (
                      <>
                        <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      "Talk to Sales"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <TalkToSalesContext.Provider value={{ openTalkToSales }}>
      {children}
      {mounted ? createPortal(dialog, document.body) : null}
    </TalkToSalesContext.Provider>
  );
}

export function TalkToSalesButton({
  trigger = "cta",
  onClick,
  children = "Talk to Sales",
  ...props
}: TalkToSalesButtonProps) {
  const context = useContext(TalkToSalesContext);

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context?.openTalkToSales(trigger);
      }}
    >
      {children}
    </Button>
  );
}
