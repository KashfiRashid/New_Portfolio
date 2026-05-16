import { SectionHead } from '../primitives.jsx'

const ACTIONS = [
  {
    label: 'ACTION 01',
    title: 'Audited competitors, confirmed client priorities.',
    body:
      'Day 1. We audited Shasha Consulting and HRSBS for interaction patterns, CTA placement, and trust cues. The client interview confirmed three priorities: cut stock imagery, add engagement, guide users toward services. Mapped the redesigned flow.',
  },
  {
    label: 'ACTION 02',
    title: 'Built the design system and mockups.',
    body:
      'Day 2. Low-fidelity wireframes for Home, About Us, Services, then high-fidelity mockups with the system: typography, color, spacing, components, and curated imagery in place of stock. The system went only as deep as three pages required.',
  },
  {
    label: 'ACTION 03',
    title: 'Built the prototype with four interactions.',
    body:
      'Day 3. I built the interactive Figma prototype and the four interaction patterns. Each pattern tied to a problem from the audit, not added for polish. Detailed in Interaction Design.',
  },
]

export default function WhatIDid() {
  return (
    <section id="what-i-did" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="WHAT WE DID"
        title="Three days, three phases."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          We split the three days by deliverable. The competitor audit, the user flow, the wireframes, the mockups, and the design system were team work. I owned the prototype and the four interaction patterns on Day 3.
        </p>
      </div>
      <div>
        {ACTIONS.map((action) => (
          <article key={action.label} className="space-y-6 py-16">
            <div className="space-y-3">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#EC613B]">
                {action.label}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[28px] font-normal tracking-[-0.02em] text-white lg:text-[36px]">
                {action.title}
              </h3>
              <p className="max-w-[720px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
                {action.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
