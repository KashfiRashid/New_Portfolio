// Preloads every character sprite at startup so the first walk or activity
// never shows a half-loaded frame. Without this, walk-b.png (~460KB) can
// arrive mid-walk and the walk renders only walk-a until it finishes
// loading - the intermittent "walks with only walk-a" glitch.
//
// Imported once for its side effect from main.jsx. Each Image() kicks off a
// fetch the browser caches; nothing is rendered here.
const SPRITES = [
  'idle', 'walk-a', 'walk-b', 'sit', 'sit-laptop', 'peek', 'wave',
  'stretch', 'showcase', 'Cofee', 'sipping-cofee', 'sipping-off-cofeea',
  'vanish-1', 'vanish-2', 'vanish-3', 'vanish-4',
]

if (typeof window !== 'undefined') {
  for (const name of SPRITES) {
    const img = new Image()
    img.src = `/character/${name}.png`
  }
}
