import {
  BlockShell,
  WideShell,
  SerifTitle,
  BodyText,
  CopyPlaceholder,
  CaptionLine,
} from '../primitives.jsx'

/**
 * Door - Block 4, "near the door".
 *
 * REVISION 4 - captions rewritten with Kash's own labels. Voice rule
 * holds: lowercase by default, sentence case for proper nouns (place
 * names, event names, organization names, people's names).
 *
 * Caption map (8 confirmed by Kash + 2 kept from prior pass):
 *   portrait.jpg       - Lake Louise, solo travel
 *   troy.jpg           - Troy
 *   me-at-IT-Squad.jpg - IT Squad, managing term with Rodrigo
 *   my-buddies.jpg     - buddies
 *   all-friends.jpg    - SFU hangout buddies
 *   photo-football     - SFU football
 *   photo-hackathons   - Journey Hack 2024
 *   photo-community    - BSA SFU Eid gala
 *   photo-extra        - paintball with Subvision team
 *   photo-hiking       - hiking at Des Vistas with friends
 *
 * Layout unchanged from rev 3 - 12-col bento, paired portraits, mixed
 * mid-row spans, full-width statements top + bottom. Photos at natural
 * aspect; no cropping.
 */
export default function Door() {
  return (
    <>
      <BlockShell id="door">
        <SerifTitle>near the door</SerifTitle>

        <BodyText className="mb-4">
          Football, both sides. I watch Bangladeshi diaspora football the way
          other people watch the Premier League. The Sullivan twins. Farhaan
          Ali Wahid. The BFF eligibility paperwork is, at this point, a
          hobby. I play casually &#x2014; rec league, pickup.
        </BodyText>

        <BodyText className="mb-4">
          The pixel room you scrolled past is more or less the real desk
          after midnight.
        </BodyText>

        <CopyPlaceholder
          targetWords="one sentence"
          note='Quiet heritage line. Pick one \u2014 PNE BBQ in the summer, the Bangla phrase that appears in the footer, something else. One sentence, no essay.'
        />
      </BlockShell>

      <WideShell id="door-photos" className="-mt-12 pt-0">
        <PhotoBento />
      </WideShell>
    </>
  )
}

function PhotoBento() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
      <PhotoCell src="/about/portrait.jpg"         alt="Lake Louise, solo travel."           caption="Lake Louise, solo travel"            spanClass="md:col-span-6" />
      <PhotoCell src="/about/troy.jpg"             alt="Troy."                               caption="Troy"                                spanClass="md:col-span-6" />

      <PhotoCell src="/about/me-at-IT-Squad.jpg"   alt="IT Squad, managing term with Rodrigo." caption="IT Squad, managing term with Rodrigo" spanClass="md:col-span-12" />

      <PhotoCell src="/about/my-buddies.jpg"       alt="Buddies, formal night."              caption="buddies"                             spanClass="md:col-span-7" />
      <PhotoCell src="/about/all-friends.jpg"      alt="SFU hangout buddies."                caption="SFU hangout buddies"                 spanClass="md:col-span-5" />

      <PhotoCell src="/about/photo-football.jpg"   alt="SFU football."                       caption="SFU football"                        spanClass="md:col-span-6" />
      <PhotoCell src="/about/photo-hackathons.jpg" alt="Journey Hack 2024."                  caption="Journey Hack 2024"                   spanClass="md:col-span-6" />

      <PhotoCell src="/about/photo-community.jpg"  alt="BSA SFU Eid gala."                   caption="BSA SFU Eid gala"                    spanClass="md:col-span-5" />
      <PhotoCell src="/about/photo-extra.jpg"      alt="Paintball with Subvision team."      caption="paintball with Subvision team"       spanClass="md:col-span-7" />

      <PhotoCell src="/about/photo-hiking.jpg"     alt="Hiking at Des Vistas with friends."  caption="hiking at Des Vistas with friends"   spanClass="md:col-span-12" />
    </div>
  )
}

/**
 * PhotoCell - print-framed photo + italic caption.
 */
function PhotoCell({ src, alt, caption, spanClass = '' }) {
  return (
    <figure className={`group block self-start ${spanClass}`}>
      <div
        className="relative w-full transition-transform duration-500 ease-out group-hover:-rotate-[0.3deg] group-[&:nth-child(even)]:group-hover:rotate-[0.3deg]"
        style={{
          backgroundColor: 'rgba(232,230,225,0.04)',
          border: '1px solid rgba(232,184,106,0.18)',
          padding: '5px',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <CaptionLine>{caption}</CaptionLine>
    </figure>
  )
}
