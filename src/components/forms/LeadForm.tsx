"use client";

import { useState } from "react";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox, FieldWrap, Select, Textarea, TextInput } from "./fields";
import { solutions } from "@/data/solutions";

interface LeadFormValues {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  storeCount: string;
  requiredSolution: string;
  message: string;
  consent: boolean;
}

const emptyValues: LeadFormValues = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  country: "India",
  businessType: "",
  storeCount: "1",
  requiredSolution: "",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof LeadFormValues, string>>;
type Status = "idle" | "submitting" | "success" | "error";

function validate(v: LeadFormValues): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Enter your name.";
  if (!v.businessName.trim()) errors.businessName = "Enter your business name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = "Enter a valid email address.";
  if (!/^[+\d][\d\s-]{7,15}$/.test(v.phone)) errors.phone = "Enter a valid phone number.";
  if (!v.businessType) errors.businessType = "Select your business type.";
  if (!v.consent) errors.consent = "Please accept to be contacted about your enquiry.";
  return errors;
}

const businessTypes = [
  "Supermarket / Grocery",
  "Fashion / Apparel / Footwear",
  "Electronics / Mobile",
  "Pharmacy",
  "Restaurant / Cafe",
  "Jewellery",
  "Furniture / Home",
  "Beauty / Cosmetics",
  "Wholesale / Distribution",
  "Franchise network",
  "Other retail",
];

/**
 * Lead capture form. Submission currently resolves locally and logs the
 * payload; the `submitLead` function is the single integration point for
 * the future backend lead API (POST /api/v1/leads).
 */
async function submitLead(payload: LeadFormValues): Promise<void> {
  // Backend integration point — replaced with a real API call when the
  // Laravel lead endpoint is available. Simulates network latency so the
  // loading state is exercised in development.
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (process.env.NODE_ENV === "development") {
    console.info("[lead-form] payload ready for backend:", payload);
  }
}

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<LeadFormValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit() {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitLead(values);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-lg border border-ledger-500/30 bg-ledger-500/5 p-8 text-center">
        <CircleCheck aria-hidden="true" className="mx-auto h-10 w-10 text-ledger-500" />
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-ink-muted">
          Our retail consultants will reach out within one business day to schedule your demo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrap label="Name" htmlFor="lead-name" required error={errors.name}>
          <TextInput
            id="lead-name"
            autoComplete="name"
            value={values.name}
            error={errors.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Business name" htmlFor="lead-business" required error={errors.businessName}>
          <TextInput
            id="lead-business"
            autoComplete="organization"
            value={values.businessName}
            error={errors.businessName}
            onChange={(e) => update("businessName", e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Work email" htmlFor="lead-email" required error={errors.email}>
          <TextInput
            id="lead-email"
            type="email"
            autoComplete="email"
            value={values.email}
            error={errors.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Phone" htmlFor="lead-phone" required error={errors.phone}>
          <TextInput
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            error={errors.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Country" htmlFor="lead-country">
          <Select id="lead-country" value={values.country} onChange={(e) => update("country", e.target.value)}>
            {["India", "Singapore", "Malaysia", "Bahrain", "UAE", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </FieldWrap>
        <FieldWrap label="Business type" htmlFor="lead-type" required error={errors.businessType}>
          <Select
            id="lead-type"
            value={values.businessType}
            error={errors.businessType}
            onChange={(e) => update("businessType", e.target.value)}
          >
            <option value="">Select…</option>
            {businessTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </FieldWrap>
        <FieldWrap label="Number of stores" htmlFor="lead-stores">
          <Select id="lead-stores" value={values.storeCount} onChange={(e) => update("storeCount", e.target.value)}>
            {["1", "2–5", "6–20", "21–50", "50+"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </FieldWrap>
        <FieldWrap label="Required solution" htmlFor="lead-solution">
          <Select
            id="lead-solution"
            value={values.requiredSolution}
            onChange={(e) => update("requiredSolution", e.target.value)}
          >
            <option value="">Not sure yet</option>
            {solutions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </Select>
        </FieldWrap>
      </div>

      {!compact ? (
        <FieldWrap label="Message" htmlFor="lead-message">
          <Textarea
            id="lead-message"
            placeholder="Tell us about your stores and what you want to improve."
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </FieldWrap>
      ) : null}

      <div>
        <Checkbox
          id="lead-consent"
          checked={values.consent}
          onChange={(e) => update("consent", e.target.checked)}
          label="I agree to be contacted by RetailPOS.biz about my enquiry."
        />
        {errors.consent ? (
          <p role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="flex items-center gap-2 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <TriangleAlert aria-hidden="true" className="h-4 w-4" />
          Something went wrong while sending your request. Please try again.
        </p>
      ) : null}

      <Button onClick={handleSubmit} size="lg" disabled={status === "submitting"} className="justify-self-start">
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Book a Free Demo"
        )}
      </Button>
    </div>
  );
}
