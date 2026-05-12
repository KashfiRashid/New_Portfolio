import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCompanion } from '../companion/CompanionContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import { RevealGroup } from '../components/Reveal.jsx'

/**
 * <People /> — named credits.
 * Per /02-wireframes/07-people.md.
 *
 * v1 launches with whatever consent is confirmed.
 * [NEEDS KASH INPUT — Q D] for each: public / relationship-only / anonymous / not-yet-asked.
 */

const PEOPLE = [
  // Each entry has a `consent` field — only `'public'` renders by default.
  { name: 'Sazzad Ahmed',          consent: 'pending', credit: 'sound on blu. the steady voice when the work gets weird.', link: { to: '/work/blu', label: 'blu (work)' }, bubbleId: 'H30' },
  { name: 'Tarif Khan',            consent: 'pending', credit: 'the first person who reads everything kash writes.', bubbleId: null },
  { name: 'Tazwar Tarik',          consent: 'pending', credit: 'the writing register on this site is downstream of his.', link: { to: '/voice', label: 'voice' }, bubbleId: 'H29' },
  { name: 'Sadab Khan',            consent: 'pending', credit: 'shipped open ground with kash.', link: { to: '/work/bc-connect', label: 'bc connect' } },
  { name: 'Tawheed Sarker Aakash', consent: 'pending', credit: 'shipped open ground with kash.', link: { to: '/work/bc-connect', label: 'bc connect' } },
  { name: 'Brett Rodrigues',       consent: 'pending', credit: 'shipped open ground with kash.', link: { to: '/work/bc-connect', label: 'bc connect' } },
  { name: 'IT Squad team',         consent: 'pending', credit: 'tuesday afternoons. live incident triage. helping thread.' },
  { name: 'Father',                consent: 'pending', credit: 'took the long route from dhaka so kash could take the next one.', bubbleId: 'H31' },
]

export default function People() {
  const { fire } = useCompanion()

  useEffect(() => {
    fire('C8', { elementId: 'people-page-entry' })
  }, [fire])

  return (
    <div className="section-page">
      <Reveal>
        <Breadcrumb section="people" />
      </Reveal>

      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          People
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          named credits. the site doesn&apos;t pretend i did this alone.
        </motion.p>
      </header>

      {/* Intro */}
      <Reveal>
        <section className="mb-12">
          <p className="text-text-muted leading-relaxed max-w-prose">
            this isn&apos;t a &apos;team&apos; page or a &apos;thanks&apos; page. these are the people who shaped specific work,
            specific choices, specific years. each one earned a sentence.{' '}
            <span className="text-text-primary">each one said yes to being on this page.</span>
          </p>
        </section>
      </Reveal>

      {/* Names */}
      <RevealGroup staggerMs={70} className="space-y-6">
        {PEOPLE.map((p) => (
          <article
            key={p.name}
            className="bg-surface-mid border border-surface-raised rounded-sm px-6 py-5 hover:border-text-faint transition-colors duration-250"
            onMouseEnter={() => p.bubbleId && fire(p.bubbleId, { elementId: `people-${p.name}` })}
          >
            <h2 className="text-display-md font-display mb-1">{p.name}</h2>
            <hr className="border-surface-raised mb-3" />
            <p className="text-text-muted leading-relaxed">{p.credit}</p>
            {p.link && (
              <p className="text-text-faint text-sm mt-3">
                → <Link to={p.link.to} className="hover:text-text-primary underline-offset-4 hover:underline">{p.link.label}</Link>
              </p>
            )}
            {p.consent !== 'public' && (
              <p className="text-text-faint italic text-xs mt-3">
                [NEEDS KASH INPUT — Q D consent: public / relationship-only / anonymous]
              </p>
            )}
          </article>
        ))}
      </RevealGroup>

      {/* More to come */}
      <Reveal delay={0.1}>
        <section className="mt-12 pt-8 border-t border-surface-raised">
          <h2 className="text-text-muted text-sm uppercase tracking-wider mb-4">— more to come —</h2>
          <p className="text-text-muted leading-relaxed max-w-prose">
            i&apos;m asking permission before adding more names here. that&apos;s the bar.
          </p>
        </section>
      </Reveal>
    </div>
  )
}
