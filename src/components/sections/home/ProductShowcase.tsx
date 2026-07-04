import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PosMockup } from "./PosMockup";
import { Icon } from "@/components/ui/Icon";

const highlights = [
  { icon: "LayoutDashboard", text: "Owner dashboard with live sales, stock value and cash position across outlets" },
  { icon: "Smartphone", text: "Works on billing PCs, tablets and Android devices with the same account" },
  { icon: "FileBarChart", text: "200+ operational reports, all exportable and schedulable by email" },
];

export function ProductShowcase() {
  return (
    <Section tone="paper" aria-labelledby="showcase-heading">
      <SectionHeading
        id="showcase-heading"
        eyebrow="Inside the product"
        title="Software your team learns in a morning"
        description="Screens are organised the way store work actually happens: bill, receive, count, order, close. Illustrative interface shown; live product demo available on request."
        align="center"
      />
      <div className="mx-auto mt-12 max-w-3xl">
        <PosMockup />
      </div>
      <ul className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
        {highlights.map((h) => (
          <li key={h.text} className="flex gap-3">
            <Icon name={h.icon} className="h-5 w-5 shrink-0 text-brand-600" />
            <p className="text-sm leading-relaxed text-ink-muted">{h.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
