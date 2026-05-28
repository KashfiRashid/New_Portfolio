import { WideShell } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Playground - the captioned hobby grid. The personality centerpiece.
 *
 * CSS-columns masonry (1 / 2 / 3 cols): every photo keeps its natural
 * aspect, no cropping - tall portraits (Lake Louise, Troy) and ultra-wide
 * panoramas (football, hiking) all sit naturally. Each photo is wrapped in
 * its own Reveal so the wall staggers in on scroll (the Reveal motion.div
 * is the masonry item; break-inside-avoid lives on it).
 *
 * Depth + dynamics: each frame carries a soft drop shadow, photos sit a
 * touch dim and brighten on hover, the frame lifts + scales slightly and
 * the amber border warms. transform / opacity / filter only, 300ms
 * ease-out (site + emil motion rule).
 *
 * [KASH CONFIRM] "Troy" caption - kept neutral; tell me the story.
 */
const PHOTOS = [
  { src: '/about/portrait.jpg',         alt: 'Lake Louise, solo travel.',          caption: 'Lake Louise, solo.' },
  { src: '/about/all-friends.jpg',      alt: 'The SFU crew.',                       caption: 'the SFU crew.' },
  { src: '/about/photo-football.jpg',   alt: 'Playing football.',                   caption: 'football. rec league, pickup.' },
  { src: '/about/troy.jpg',             alt: 'Troy.',                               caption: 'this is Troy.' },
  { src: '/about/me-at-IT-Squad.jpg',   alt: 'The FIC IT Squad.',                   caption: 'the FIC IT Squad, with Rodrigo.' },
  { src: '/about/photo-hiking.jpg',     alt: 'Hiking at Des Vistas.',               caption: 'Des Vistas. worth the climb.' },
  { src: '/about/my-buddies.jpg',       alt: 'The buddies, formal night.',          caption: 'the buddies, cleaned up.' },
  { src: '/about/photo-hackathons.jpg', alt: 'Journey Hack 2024.',                  caption: 'Journey Hack 2024, past midnight.' },
  { src: '/about/photo-community.jpg',  alt: 'BSA SFU Eid gala.',                    caption: 'BSA SFU Eid gala.' },
  { src: '/about/photo-extra.jpg',      alt: 'Paintball with the Subvision team.',  caption: 'paintball with the Subvision team.' },
]

export default function Playground() {
  return (
    <WideShell id="playground" className="pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 0.08} y={14} className="mb-5 break-inside-avoid">
            <PhotoCell {...p} />
          </Reveal>
        ))}
      </div>
    </WideShell>
  )
}

function PhotoCell({ src, alt, caption }) {
  return (
    <figure className="group">
      <div
        className="relative w-full overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-kash-out group-hover:-translate-y-1 group-hover:scale-[1.015]"
        style={{
          backgroundColor: 'rgba(232,230,225,0.04)',
          border: '1px solid rgba(232,184,106,0.18)',
          padding: '6px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(232,184,106,0.55)'
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(232,184,106,0.18)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)'
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full brightness-[0.92] transition-[filter] duration-300 ease-kash-out group-hover:brightness-[1.05]"
        />
      </div>
      <figcaption className="font-sans mt-2.5 text-[13px] leading-[1.4] text-text-muted transition-colors duration-200 ease-kash-out group-hover:text-text-primary">
        {caption}
      </figcaption>
    </figure>
  )
}
