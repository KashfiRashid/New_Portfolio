import { SectionHead, Prose, VideoFigure, Figure } from '../primitives.jsx'

export default function Demo() {
  return (
    <section id="demo" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="The demo" title="Both models, one screen" />
      <div className="space-y-10">
        <Prose className="max-w-[680px]">
          <p>
            To make it tangible, I built a desktop app that runs both models live. Pick a
            customer, hit analyze, and it shows their high-value probability and revenue
            opportunity next to a ranked set of next-item recommendations and the cross-sell
            revenue they represent.
          </p>
        </Prose>

        <VideoFigure
          src="/market-basket/demo.mp4"
          poster="/market-basket/demo-poster.jpg"
          caption="The Dual AI Retail Intelligence demo, running end to end."
          aspect="16 / 9"
        />

        <Figure
          src="/market-basket/implementation.jpg"
          alt="The implementation: the recommender and preprocessing code running in the editor."
          caption="Under the hood - the preprocessing and KNN pipeline, packaged with the trained models."
        />
      </div>
    </section>
  )
}
