import { SectionHead, Highlight } from '../primitives.jsx'

export default function Challenge() {
  return (
    <section id="challenge" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE CHALLENGE" title="The client thought they had a marketing problem." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Cullen Western Star came in with a clear brief: &ldquo;We have a loyal customer base, but it isn&rsquo;t growing because our online presence is outdated.&rdquo;
        </p>
        <p>
          <Highlight>Our diagnosis after the field work was different. The real problem wasn&rsquo;t marketing &#x2014; it was an industry-wide worker shortage.</Highlight> Trucking was losing the competition for Gen-Z talent, and no amount of website polish was going to bring drivers in. So the brief shifted: instead of redesigning the storefront, design the path into the trade.
        </p>
      </div>
    </section>
  )
}
