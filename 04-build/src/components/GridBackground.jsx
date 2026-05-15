/**
 * GridBackground — ambient drifting blueprint grid for the portfolio canvas.
 *
 * Reference: Anthropic Dispatch, Linear marketing, Vercel dashboard. A
 * hairline engineer's grid, almost invisible, drifting continuously
 * downward so the page feels like it is gently moving through space.
 *
 * Composition:
 *   - Two layers for depth. A fine 32px grid and a coarse 128px grid, the
 *     coarse one fainter. Together they read as a plane receding into
 *     perspective — the "Dispatch" effect. Two layers chosen over one
 *     because the landing canvas is otherwise flat dark; the second layer
 *     gives it macro structure without adding noise.
 *   - A radial mask, brightest at center, fading to the edges — the
 *     Dispatch "spotlight on the canvas." The main portfolio centers its
 *     content (max-w-3xl mx-auto), so the radial fade amplifies that
 *     hierarchy instead of fighting it, and it keeps the grid off the
 *     edges where it would otherwise compete with the existing body
 *     vignette.
 *   - Pure-CSS downward drift. background-position animates from 0 to one
 *     full coarse tile over --grid-drift-speed. The coarse size is a
 *     multiple of the fine size, so both layers loop seamlessly with no
 *     snap. Pure downward (no rightward component) because the brief's
 *     core ask is "naturally scrolling down" — a diagonal would read as
 *     drift, not as descent.
 *
 * No JS scroll-parallax. The brief offered it, but per Earn Your Pixel the
 * CSS drift alone delivers the "moving through space" feel without a
 * scroll listener's runtime cost or jitter risk.
 *
 * Layering: position fixed, z-index -1, pointer-events none. It is a pure
 * ground layer — never intercepts input, always behind content and the
 * character/companion overlay.
 *
 * Tunable knobs live in :root in index.css:
 *   --grid-line-fine    fine-grid line color (hue + opacity together)
 *   --grid-line-coarse  coarse-grid line color
 *   --grid-size-fine    fine square size (default 32px)
 *   --grid-size-coarse  coarse square size (default 128px) — the drift
 *                       keyframe below reads this directly, so the loop
 *                       stays seamless if you retune it
 *   --grid-drift-speed  duration of one full coarse-tile cycle (120s)
 *
 * Reduced motion: the global prefers-reduced-motion rule in index.css
 * already neutralizes animation site-wide; the local rule below is
 * explicit belt-and-suspenders.
 */
export default function GridBackground() {
  return (
    <>
      <style>{`
        @keyframes gridDrift {
          from {
            background-position: 0 0, 0 0, 0 0, 0 0;
          }
          to {
            background-position:
              0 var(--grid-size-coarse),
              0 var(--grid-size-coarse),
              0 var(--grid-size-coarse),
              0 var(--grid-size-coarse);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .grid-background { animation: none; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="grid-background"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
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
          WebkitMaskImage:
            'radial-gradient(ellipse at center, #000 0%, rgba(0,0,0,0.55) 55%, transparent 85%)',
          maskImage:
            'radial-gradient(ellipse at center, #000 0%, rgba(0,0,0,0.55) 55%, transparent 85%)',
        }}
      />
    </>
  )
}
