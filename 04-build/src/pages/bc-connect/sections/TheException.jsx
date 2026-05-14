import { SectionHead } from '../primitives.jsx'

const PARAGRAPHS = [
  "It was late. Probably 11pm or midnight before the demo. The hero had two restrained pill-shaped buttons, black and green, completely on-system. It worked. But it didn't pull. The page was so visually quiet that the primary CTA just sat there. It wasn't earning the conversion it needed to.",
  "It was mostly a solo call. I showed the team the before and after, the restrained version next to the gradient one, and asked if it felt out of place. The consensus was that it didn't, because everything around it stayed restrained. The button's energy worked because the rest of the page didn't compete with it. But I won't pretend it was a deeply deliberated team design session. It wasn't.",
  "Not much pushback in the moment, which I actually think was the problem. When I came back to it for the Style Guide write-up, I had to sit with the uncomfortable reality that it violated all three of my own design laws. That's when I had to ask myself: am I defending this because it's actually correct, or because I shipped it? I landed on: it's defensible, but it's an exception, not a principle. The Style Guide removes it from the component set entirely for that reason. It's documented as a production experiment, not a system element.",
  "I'd test whether a single-color animated glow, just the signal green pulsing outward, could create the same pull without touching the gradient. That would stay inside the system. The rainbow gradient works, but it's doing a lot. The question I didn't ask rigorously enough at the time was: what's the minimum amount of exception I need here?",
]

export default function TheException() {
  return (
    <section id="the-exception" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE EXCEPTION"
        title="The one rule I broke. And why I kept it out of the system."
      />
      <div className="max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        {PARAGRAPHS.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <blockquote className="mx-auto mt-12 max-w-[900px] text-center font-[family-name:var(--font-display)] text-[28px] italic leading-snug text-[#1B6B4F] lg:text-[36px]">
        A good exception doesn't become a rule.
      </blockquote>
    </section>
  )
}
