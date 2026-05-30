import { SectionHead, Prose, Highlight } from '../primitives.jsx'

export default function Signify() {
  return (
    <section id="signify" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Origin / 2024" title="Signify: teaching a camera to read hands" />
      <div className="space-y-10">
        <Prose className="max-w-[700px]">
          <p>
            A year before the hackathon, this was a school project - IAT 360, with Hasrat
            Buttar. The first model classified ASL letters from{' '}
            <Highlight>26,000 images</Highlight>. We rebuilt it: retrained a YOLO model on{' '}
            <Highlight>81,000 images</Highlight>, added a &ldquo;space&rdquo; sign so you
            could build sentences, and paired it with a FastText language model that
            predicts the word after just two letters.
          </p>
          <p>
            It ran live in a Tkinter GUI - webcam feed, detection box, confidence scores,
            sentence building - with a React Native prototype for mobile. signs in, text
            out, in real time.
          </p>
          <p>
            It proved the core idea: a camera really can read sign language as it happens.
            it also taught us the wall - general ASL-to-text is enormous, and the dataset
            carried real bias across skin tones and lighting. a working recognition brain,
            with no body and no single job to do.
          </p>
        </Prose>

        <figure>
          <img
            src="/asl-express/signify-recognition.jpg"
            alt="Signify recognizing live ASL letters across different hands, each labelled with its predicted letter."
            loading="lazy"
            className="w-full max-w-xl rounded-xl border border-white/[0.08]"
          />
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            Signify reading live signs - the recognition model&apos;s own output.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
