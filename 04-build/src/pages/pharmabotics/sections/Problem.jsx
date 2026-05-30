import { SectionHead, Prose } from '../primitives.jsx'

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="The problem" title="The right pill, the right time" />
      <Prose className="max-w-[680px]">
        <p>
          Medication non-adherence is common and costly - missed doses, wrong amounts, and
          constant supervision, especially for elderly and clinical patients.
        </p>
        <p>
          We took a narrow, answerable version of it: can a machine hand the right person the
          right pill at the right time, securely, and take some load off staff?
        </p>
      </Prose>
    </section>
  )
}
