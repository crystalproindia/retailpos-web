import { AlertTriangle, Eye } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function PreviewBanner({ label }: { label: string }) {
  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-950">
      <Container className="flex flex-col gap-2 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 font-medium">
          <Eye aria-hidden="true" className="h-4 w-4" />
          Preview Mode: {label}
        </p>
        <p className="text-xs text-amber-800">Draft content is private, noindexed, and not part of the public website.</p>
      </Container>
    </div>
  );
}

export function PreviewUnavailable({ title = "Preview unavailable" }: { title?: string }) {
  return (
    <>
      <PreviewBanner label="Unavailable" />
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-xl rounded-lg border border-line bg-white p-6 text-center shadow-card">
          <AlertTriangle aria-hidden="true" className="mx-auto h-10 w-10 text-accent-600" />
          <h1 className="mt-4 font-display text-display-sm font-semibold text-ink">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            This draft preview link is missing, expired, revoked, or no longer authorized for this content.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/" variant="ghost">Return to public site</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
