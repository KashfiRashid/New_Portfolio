import { SectionHead, Prose, Highlight, CodeBlock, Figure } from '../primitives.jsx'
import RecursionPlayer from '../diagrams/RecursionPlayer.jsx'

export default function Generative() {
  return (
    <section id="generative" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Noise & fractals" title="Graphics that are computed, not drawn" />
      <Prose className="mb-14 max-w-[680px]">
        <p>
          Two effects are not sprites at all. They are generated pixel by pixel, every frame,
          and they were my first taste of <Highlight>procedural graphics</Highlight>.
        </p>
      </Prose>

      <div className="space-y-16">
        {/* Perlin smoke */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-white">Perlin-noise smoke</h3>
            <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
              The smoke off the smelter is a grid of small puffs. Each puff reads its size, grey,
              transparency, and rotation from a field of Perlin noise, so neighbours agree and the
              cloud drifts naturally. It is tied to play:{' '}
              <Highlight>the faster you pump the bellows, the faster the field advances</Highlight>{' '}
              and the more it billows.
            </p>
            <Figure
              src="/clicker-forge/shot-molten.png"
              alt="Smelter with Perlin-noise smoke rising over molten copper."
              caption="Each frame, a noise field decides every puff."
            />
          </div>
          <CodeBlock label="SmeltingRoom/Steam.java">{`for (int y = 0; y <= height; y += 5) {
    ynoise += 0.1f;
    xnoise  = xstart;
    for (int x = 0; x <= width; x += 5) {
        xnoise += 0.1f;
        float n = pa.noise(xnoise, ynoise); // Perlin

        g2.rotate(n * radians(540));
        float size = n * 35;
        int grey = (int) (150 + n * 105);
        int a    = (int) ( 80 + n * 105);
        g2.setColor(new Color(grey, grey, grey, a));
        g2.fill(new Ellipse2D.Float(
            -size / 2, -size / 4, size, size / 2 * n));
    }
}`}</CodeBlock>
        </div>

        {/* Fractal */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <CodeBlock label="HammerRoom/HammeringEffect.java" className="lg:order-1">{`private void drawRecursiveFractal(Graphics2D g2,
        int x, int y, int r, float alpha, int depth) {
    if (depth == 0) return;            // base case

    g2.setColor(withAlpha(color, alpha));
    g2.drawOval(x - r, y - r, r * 2, r * 2);

    int nr = r / 2;                    // four children,
    // half the size, fainter, one level shallower
    drawRecursiveFractal(g2, x - nr, y, nr, alpha*0.8f, depth-1);
    drawRecursiveFractal(g2, x + nr, y, nr, alpha*0.8f, depth-1);
    drawRecursiveFractal(g2, x, y - nr, nr, alpha*0.8f, depth-1);
    drawRecursiveFractal(g2, x, y + nr, nr, alpha*0.8f, depth-1);
}`}</CodeBlock>
          <div className="space-y-4 lg:order-2">
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-white">Recursive hammer shockwaves</h3>
            <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
              Every strike spawns a shockwave built by recursion: a ring, then four half-size
              rings around it, then four around each, fading out. How cleanly you hit the bar
              scales the whole pattern. The window below runs that exact recursion, growing and
              fading, then replaying larger.
            </p>
            <div className="rounded-2xl border border-white/[0.06] bg-[#0F0B06] p-6">
              <RecursionPlayer />
              <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                live: four levels deep, looping at larger scales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// end Generative.jsx
