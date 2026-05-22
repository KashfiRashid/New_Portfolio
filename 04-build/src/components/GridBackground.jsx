import { memo } from 'react'

/**
 * GridBackground - ambient drifting blueprint grid for the portfolio canvas.
 *
 * A hairline engineer's grid, almost invisible, drifting continuously
 * downward so the page feels like it is gently moving through space.
 *
 * Composition:
 *   - Two layers for depth. A fine 32px grid and a coarse 128px grid, the
 *     coarse one fainter. Together they read as a plane receding into
 *     perspective.
 *   - A radial mask, brightest at center, fading to the edges - the
 *     "spotlight on the canvas."
 *
 * Performance - why this is two divs:
 *   The drift used to animate `background-position`, which forces the
 *   browser to REPAINT the whole fixed full-screen layer every single
 *   frame. On the always-present canvas that is a constant CPU/GPU tax and
 *   a major cause of scroll jank. Instead the grid now drifts via
 *   `transform: translate3d(...)`, which the compositor handles on the GPU
 *   with no repaint at all.
 *
 *   But the radial mask must stay locked to the viewport - if it rode on
 *   the moving layer the "spotlight" would drift too. So the layer is
 *   split: a static outer wrapper carries the mask + clips overflow; a
 *   taller inner layer carries the grid image and the transform animation.
 *   The inner layer is one coarse tile taller than the viewport and starts
 *   one tile above it, so translating down by exactly one coarse tile
 *   keeps full coverage and loops seamlessly (the pattern repeats every
 *   coarse tile, and the coarse size is a multiple of the fine size).
 *
 * Tunable knobs live in :root in index.css:
 *   --grid-line-fine / --grid-line-coarse  line colors
 *   --grid-size-fine (32px) / --grid-size-coarse (128px)  tile sizes
 *   --grid-drift-speed (120s)  duration of one full coarse-tile cycle
 *
 * Reduced motion: the global prefers-reduced-motion rule in index.css
 * already neutralizes animation site-wide; the local rule below is
 * explicit belt-and-suspenders.
 *
 * Layering: outer wrapper is position:fixed, z-index -1, pointer-events
 * none - a pure ground layer, never intercepting input.
 */
function GridBackground() {
  return (
    <>
      <style>{`
        @keyframes gridDrift {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, var(--grid-size-coarse), 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .grid-background { animation: none; }
        }
      `}</style>
      {/* Static outer wrapper - carries the viewport-locked radial mask and
          clips the taller inner layer. Never transforms, so the mask
          "spotlight" stays centered on the viewport. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          overflow: 'hidden',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, #000 0%, rgba(0,0,0,0.55) 55%, transparent 85%)',
          maskImage:
            'radial-gradient(ellipse at center, #000 0%, rgba(0,0,0,0.55) 55%, transparent 85%)',
        }}
      >
        {/* Moving inner layer - one coarse tile taller than the viewport,
            offset one tile up, drifting down by exactly one tile via a
            GPU-composited transform (no repaint). */}
        <div
          className="grid-background"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 'calc(-1 * var(--grid-size-coarse))',
            height: 'calc(100% + var(--grid-size-coarse))',
            willChange: 'transform',
            backgroundImage: [
              'linear-gradient(to right, var(--grid-line-fine) 1px, transparent 1px)',
              'linear-gradient(to bottom, var(--grid-line-fine) 1px, transparent 1px)',
              'linear-gradient(to right, var(--grid-line-coarse) 1px, transparent 1px)',
              'linear-gradient(to bottom, var(--grid-line-coarse) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: [
              'var(--grid-size-fine) var(--grid-size-fine)',
              'var(--grid-size-fine) var(--grid-size-fine)',
              'var(--grid-size-coarse) var(--grid-size-coarse)',
              'var(--grid-size-coarse) var(--grid-size-coarse)',
            ].join(', '),
            animation: 'gridDrift var(--grid-drift-speed) linear infinite',
          }}
        />
      </div>
    </>
  )
}

// memo: GridBackground takes no props, so it renders exactly once and is
// skipped on every subsequent AppShell re-render.
export default memo(GridBackground)
