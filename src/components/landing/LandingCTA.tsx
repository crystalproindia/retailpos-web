import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { primaryCtas } from "@/data/ctas";

export function LandingCTA({ heading }: { heading?: string }) {
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
          <ButtonLink href={primaryCtas.bookDemo.href}>{primaryCtas.bookDemo.label}</ButtonLink>
          <ButtonLink href={primaryCtas.talkToSales.href} variant="inverted">
            {primaryCtas.talkToSales.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
