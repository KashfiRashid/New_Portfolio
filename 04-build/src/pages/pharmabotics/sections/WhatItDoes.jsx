import { SectionHead, Prose, Figure } from '../primitives.jsx'

const ROLES = [
  { who: 'Doctor', does: 'Enrolls a patient by fingerprint; sets the medication, dosage, and intervals. Sees every patient in the system.' },
  { who: 'Patient', does: 'Authenticates by fingerprint, gets cued by on-machine LEDs when a dose is due, and receives the exact pill when their hand enters the bay.' },
]

export default function WhatItDoes() {
  return (
    <section id="what-it-does" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="What it does" title="Two roles, one secure machine" />
      <div className="space-y-10">
        <Prose className="max-w-[680px]">
          <p>
            Fingerprint identity decides everything: it tells the machine who you are and
            whether you are a doctor or a patient, then shows the right screen and dispenses
            only when a dose is actually due.
          </p>
        </Prose>
        <div>
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#5EEAD4]">From sketch to screen</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:items-start">
            <Figure src="/pharmabotics/sketch-ui.jpg" alt="UI sketch: welcome doc, add and track patients, time left." caption="The idea: a doctor adds and tracks patients." />
            <Figure src="/pharmabotics/doctor-ui.jpg" alt="The built doctor screen: add a patient, set meds, dosage, interval." caption="Built: the doctor screen - add + track patients." />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {ROLES.map((r) => (
            <div key={r.who} className="border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="font-[family-name:var(--font-display)] text-2xl text-white">{r.who}</div>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">{r.does}</p>
            </div>
          ))}
        </div>
        <Figure src="/pharmabotics/entrace-Ui.png" alt="The patient entrance screen: scan your fingerprint to begin." aspect="16 / 9" caption="The entrance: scan a fingerprint to begin." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Figure src="/pharmabotics/fingerprint-enrolment.png" alt="Enrolling a patient's fingerprint." caption="Enroll a fingerprint." />
          <Figure src="/pharmabotics/dosage-time.png" alt="A patient's dosage countdown." caption="Live next-dose countdown." />
        </div>
        <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-500">
          The React/Node interface and the fingerprint integration were built by Harjot and Faaiz.
        </p>
      </div>
    </section>
  )
}
