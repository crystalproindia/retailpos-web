import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { primaryCtas } from "@/data/ctas";

interface LandingCTAProps {
  heading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function LandingCTA({ heading, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: LandingCTAProps) {
  return (
    <div className="border-t border-line bg-ink text-white">
      <Container className="flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center sm:py-14">
        <div>
          <h2 className="font-display text-display-sm font-semibold sm:text-display-md">
            {heading ?? "See it running on your own products"}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-brand-100">
            A 30-minute walkthrough with your items, your workflows and your questions.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={primaryHref ?? primaryCtas.bookDemo.href}>
            {primaryLabel ?? primaryCtas.bookDemo.label}
          </ButtonLink>
          <ButtonLink href={secondaryHref ?? primaryCtas.talkToSales.href} variant="inverted">
            {secondaryLabel ?? primaryCtas.talkToSales.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
