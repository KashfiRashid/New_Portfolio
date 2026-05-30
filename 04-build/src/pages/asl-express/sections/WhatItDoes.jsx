import { SectionHead, Prose, Highlight, Figure } from '../primitives.jsx'

const GESTURES = [
  { sign: 'A', means: 'Burger' },
  { sign: 'B', means: 'Fries' },
  { sign: 'C', means: 'Drink' },
  { sign: 'thumbs-up', means: 'Confirm' },
]

const FLOW = [
  { src: '/asl-express/order_selection.png', cap: 'Sign a letter to add an item.' },
  { src: '/asl-express/how-many.png', cap: 'Repeat 1-3 times for quantity.' },
  { src: '/asl-express/Order_added.png', cap: 'Instant confirmation per add.' },
  { src: '/asl-express/Reciept.png', cap: 'Thumbs-up. Order placed.' },
]

export default function WhatItDoes() {
  return (
    <section id="what-it-does" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="The product" title="Order with your hands" />
      <div className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <Figure src="/asl-express/Burgers_sign.jpg" alt="A hand forming an ASL sign at the camera." aspect="3 / 4" position="center" caption="The only input: your hand." />
          <div className="space-y-6">
            <Prose>
              <p>
                A camera reads your hand. <Highlight>That is the whole interface.</Highlight>{' '}
                each sign is a menu item; repetitions set quantity; a thumbs-up confirms.
              </p>
            </Prose>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {GESTURES.map((g) => (
                <div key={g.sign} className="border border-white/[0.08] bg-white/[0.02] p-5">
                  <div className="font-[family-name:var(--font-display)] text-3xl text-[#6EE7B7]">{g.sign}</div>
                  <div className="mt-2 font-[family-name:var(--font-sans)] text-sm text-zinc-300">{g.means}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((f) => (
            <Figure key={f.src} src={f.src} alt={f.cap} aspect="16 / 10" caption={f.cap} />
          ))}
        </div>

        <p className="max-w-[680px] font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-400">
          Honest scope: four gestures plus a done signal, one demo menu, a laptop camera.
          a 24-hour proof of concept - the MVP of a scalable idea, on purpose.
        </p>
      </div>
    </section>
  )
}
