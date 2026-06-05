import { SectionHead, Prose, Highlight, CodeBlock } from '../primitives.jsx'

export default function JavaCraft() {
  return (
    <section id="java" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="What I learned in Java" title="The craft behind the craft" />
      <Prose className="mb-14 max-w-[680px]">
        <p>
          This is where object-oriented programming became a tool I reached for. Three ideas did
          most of the work:{' '}
          <Highlight>abstraction</Highlight>, a <Highlight>factory</Highlight>, and a{' '}
          <Highlight>decorator chain</Highlight>. Here is the code where each earned its keep.
        </p>
      </Prose>

      <div className="space-y-16">
        {/* Abstraction */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#C8A24B]">01 / Abstraction</p>
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-white">One base class, every object</h3>
            <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
              Copper, crucible, smelter, and sword are different sprites with the same needs:
              each gets positioned, scaled, hit tested, and drawn. So one abstract{' '}
              <code className="text-[#E5C877]">Item</code> class owns that behaviour, and every
              object in the smelting room inherits a correct click test and a centered draw.
            </p>
          </div>
          <CodeBlock label="SmeltingRoom/Item.java">{`public abstract class Item {
    protected PVector pos;
    protected double  scale;
    protected BufferedImage img;

    // every item knows how to test a click against its own bounds
    public boolean clicked(double x, double y) {
        return x > pos.x - img.getWidth()  / 2.0 * scale
            && x < pos.x + img.getWidth()  / 2.0 * scale
            && y > pos.y - img.getHeight() / 2.0 * scale
            && y < pos.y + img.getHeight() / 2.0 * scale;
    }

    // and how to draw itself, centered, at its own scale
    public void draw(Graphics2D g2) {
        AffineTransform t = g2.getTransform();
        g2.translate(pos.x, pos.y);
        g2.scale(scale, scale);
        g2.drawImage(img, -img.getWidth() / 2,
                          -img.getHeight() / 2, null);
        g2.setTransform(t);   // restore - never leak transform state
    }
}`}</CodeBlock>
        </div>

        {/* Factory */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <CodeBlock label="Factory/ConcreteFactory.java" className="lg:order-1">{`public class ConcreteFactory extends AbstractFactory {
    @Override
    public Item createItem(String name) {
        switch (name.toLowerCase()) {
            case "smelter":  return new Smelter(600, 570, 1);
            case "crucible": return new Crucible(170, 290, 1);
            case "sword":    return new Sword(580, 310, 1);
            // ...one place that knows how to build everything
            default:
                throw new IllegalArgumentException(
                    "Unknown item: " + name);
        }
    }
}`}</CodeBlock>
          <div className="space-y-4 lg:order-2">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#C8A24B]">02 / Factory pattern</p>
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-white">Asking for objects by name</h3>
            <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
              The panel should not need to know the constructor arguments for ten different
              sprites. So it asks a factory: <code className="text-[#E5C877]">createItem(&quot;crucible&quot;)</code>{' '}
              and gets back a ready <code className="text-[#E5C877]">Item</code>. All the messy
              positioning and sizing lives in <Highlight>one place</Highlight>, and the rest of
              the game just talks in plain names.
            </p>
          </div>
        </div>

        {/* Decorator */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#C8A24B]">03 / Decorator pattern</p>
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-white">Stacking layers on the blade</h3>
            <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
              An emblem, then a grip, then maybe both. The finishing room needed a way to keep
              adding decorations without rewriting the draw code. Each decorator{' '}
              <Highlight>wraps the thing beneath it</Highlight> and paints one more layer on top.
              Add as many as you like; the order is the paint order.
            </p>
          </div>
          <CodeBlock label="Decorators/RoomDecorator.java">{`// each decorator wraps the room and paints one
// more layer on top of whatever is already there
public class RoomDecorator implements Room1 {
    protected Room1 base;
    protected BufferedImage img;

    public RoomDecorator(double x, double y, double sca,
                         Room1 base, String sprite) {
        this.base = base;
        this.img  = ImageLoader.loadImage(sprite);
    }

    public void addDecoration(Graphics2D g2) {
        AffineTransform t = g2.getTransform();
        g2.translate(xPos, yPos);
        g2.scale(scale, scale);
        g2.drawImage(img, -img.getWidth() / 2,
                          -img.getHeight() / 2, null);
        g2.setTransform(t);
    }
}`}</CodeBlock>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 lg:p-8">
        <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl text-white">And a pile of fundamentals</h3>
        <p className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
          Around those three patterns, the project drilled the basics into me:{' '}
          <code className="text-[#E5C877]">Graphics2D</code> with save / restore{' '}
          <code className="text-[#E5C877]">AffineTransform</code> stacks so transforms never
          leak between objects, <code className="text-[#E5C877]">BufferedImage</code> sprite
          loading, mouse and key listeners wired into the panel, interfaces and inheritance,
          and <Highlight>try / catch blocks throughout</Highlight> so a missing asset or an odd
          click never takes the whole program down. By the end, reaching for a class instead of
          a pile of variables had become the natural move.
        </p>
      </div>
    </section>
  )
}
