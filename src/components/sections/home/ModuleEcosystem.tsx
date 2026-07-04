import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { erpModules } from "@/data/modules";

export function ModuleEcosystem() {
  return (
    <Section tone="ink" aria-labelledby="modules-heading">
      <SectionHeading
        id="modules-heading"
        eyebrow="ERP modules"
        title="Twelve modules. One source of truth."
        description="Every module reads and writes the same items, parties and ledgers, so procurement, sales, warehouse and finance always agree."
        invert
        align="center"
      />
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {erpModules.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/modules/${m.slug}`}
              className="group flex h-full flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-400/60 hover:bg-white/10"
            >
              <Icon name={m.icon} className="h-5 w-5 text-brand-200" />
              <span className="text-sm font-medium text-white group-hover:text-brand-100">{m.name}</span>
              <span className="line-clamp-2 text-xs leading-relaxed text-white/55">{m.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-white/60">
        <Link href="/modules" className="font-medium text-brand-200 underline-offset-2 hover:underline">
          View the full module catalogue →
        </Link>
      </p>
    </Section>
  );
}
