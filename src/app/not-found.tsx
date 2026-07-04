import { SearchX } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { primaryCtas } from "@/data/ctas";

export default function NotFound() {
  return (
    <Section tone="paper" className="min-h-[50vh]">
      <div className="mx-auto max-w-lg text-center">
        <SearchX aria-hidden="true" className="mx-auto h-12 w-12 text-brand-600" />
        <h1 className="mt-6 font-display text-display-md font-semibold text-ink">Page not found</h1>
        <p className="mt-3 text-ink-muted">
          This page doesn&apos;t exist yet or has moved. Head back home to explore the RetailPOS platform.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Go to homepage</ButtonLink>
          <ButtonLink href={primaryCtas.bookDemo.href} variant="ghost">
            {primaryCtas.bookDemo.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
