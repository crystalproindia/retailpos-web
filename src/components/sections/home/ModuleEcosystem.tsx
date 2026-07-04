import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { erpModules } from "@/data/modules";

const sharedData = ["Items", "Customers", "Suppliers", "Stores", "Stock", "Transactions", "Ledgers", "Analytics"];

/**
 * ERP system map: 12 modules arranged around a shared data core.
 * All module links remain crawlable anchors; layout is pure CSS grid.
 */
export function ModuleEcosystem() {
  const top = erpModules.slice(0, 4);
  const left = erpModules.slice(4, 6);
  const right = erpModules.slice(6, 8);
  const bottom = erpModules.slice(8, 12);

  const ModuleLink = ({ slug, name, icon }: { slug: string; name: string; icon: string }) => (
    <Link
      href={`/modules/${slug}`}
      className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 transition-colors hover:border-brand-400/60 hover:bg-white/10"
    >
      <Icon name={icon} className="h-4 w-4 shrink-0 text-brand-200" />
      <span className="truncate text-xs font-medium text-white group-hover:text-brand-100">{name}</span>
    </Link>
  );

  return (
    <Section tone="ink" className="py-14 sm:py-16 lg:py-20" aria-labelledby="modules-heading">
      <SectionHeading
        id="modules-heading"
        eyebrow="ERP modules"
        title="Twelve modules. One source of truth."
        description="Every module reads and writes the same core data, so procurement, sales, warehouse and finance always agree."
        invert
        align="center"
      />

      <div className="mx-auto mt-10 max-w-4xl">
        {/* top row */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {top.map((m) => <ModuleLink key={m.slug} {...m} />)}
        </div>

        {/* connectors */}
        <div aria-hidden="true" className="mx-auto grid w-3/4 grid-cols-4 justify-items-center">
          {[0, 1, 2, 3].map((i) => <span key={i} className="h-4 w-px bg-white/15" />)}
        </div>

        {/* middle: left column, core, right column */}
        <div className="grid items-stretch gap-2 sm:grid-cols-[1fr,1.6fr,1fr]">
          <div className="grid content-center gap-2">
            {left.map((m) => <ModuleLink key={m.slug} {...m} />)}
          </div>
          <div className="rounded-lg border border-brand-400/40 bg-brand-800/60 p-4 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-200">Shared ERP data core</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
              {sharedData.map((d) => (
                <li key={d} className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-brand-100">
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-white/50">Written once, read by every module in real time</p>
          </div>
          <div className="grid content-center gap-2">
            {right.map((m) => <ModuleLink key={m.slug} {...m} />)}
          </div>
        </div>

        <div aria-hidden="true" className="mx-auto grid w-3/4 grid-cols-4 justify-items-center">
          {[0, 1, 2, 3].map((i) => <span key={i} className="h-4 w-px bg-white/15" />)}
        </div>

        {/* bottom row */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {bottom.map((m) => <ModuleLink key={m.slug} {...m} />)}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-white/60">
        <Link href="/modules" className="font-medium text-brand-200 underline-offset-2 hover:underline">
          View the full module catalogue →
        </Link>
      </p>
    </Section>
  );
}
