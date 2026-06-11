// Page Guide content - the companion's "docent" mode.
// One ordered array per route: index 0 is the greeting (fired on entry),
// the rest are scroll beats (one fires as the visitor crosses each segment).
// Scoped per page - the guide only ever talks about where you are.
// Voice: Kash, lowercase, in character. Pure ASCII (formatter-safe).

const home = [
  "this is home. the line up top isn't a typo - read it twice.",
  "featured first. the strongest stuff leads, on purpose.",
  "everything past the fold is the rest of the work.",
  "still scrolling? respect. there is a space shooter to play near the bottom.",
]

const work = [
  "the archive. strongest projects first, not alphabetical.",
  "filter by kind up top if you're hunting for something specific.",
  "every card's a real thing i shipped. click in.",
]

const about = [
  "the about page. less resume, more who i actually am.",
  "the wall up there is the hobbies. the rows are the receipts.",
  "experience, awards, education - then say hi at the bottom.",
]

const arcade = [
  "the arcade. a space shooter i built in first year.",
  "click to start, then survive. your best score sticks around.",
]

const pharmabotics = [
  "pharmabotics. the one i'm proudest of the hardware on.",
  "the problem first - why a pill dispenser even needs to exist.",
  "this stretch is the part i built: the mechanism and the embedded code.",
  "the honest bit - what broke, and the water feature we cut.",
  "15 out of 15 dispenses at the showcase. it actually worked.",
]

const aslExpress = [
  "asl express. won best hardware - and it started personal.",
  "the gap on a video call with my cousin. that's the why.",
  "i handled the front end. the recognition model too.",
  "honest demo framing here - what's real, what's staged.",
  "it grew out of a research project called signify.",
]

const marketBasket = [
  "market basket. the data-science one. the story is restraint.",
  "we over-engineered the recommender first. 3-4% accuracy. ouch.",
  "then a plain knn model hit 38.75%. simpler won.",
  "the demo runs both models live. have a look.",
]

const bcConnect = [
  "bc connect. the one i built a whole design system for.",
  "open ground - white, forest green, no dark-mode cop-out.",
  "six production frontend features, all from that one system.",
]

const foresee = [
  "foresee. the voice orb that won best use of elevenlabs.",
  "talk to it, it helps you spend smarter. that's the pitch.",
  "the orb was the iconic feature - that's why it's the thumbnail.",
]

const generic = [
  "this one's a real project. take your time scrolling it.",
  "the side nav up top jumps between sections if you want.",
]

const parpro = [
  "parpro consulting. a 3-day interaction design sprint.",
  "redesigning the site for a canadian bookkeeping firm.",
  "tight timeline, real client, real constraints.",
  "the rebuild: clearer, calmer, easier to trust.",
]

const documentor = [
  "documentor. a mobile guide for settling into a new city.",
  "built from lived experience - i knew this problem firsthand.",
  "for international students, the part nobody warns you about.",
  "small, careful, human. that was the whole goal.",
]

const blu = [
  "blu. a 3-act CG animated short film.",
  "the twist: sound carries the story, not the visuals.",
  "listen at 0:42. that part took three takes.",
]

const spectralBloom = [
  "spectral bloom. visuals that actually listen to audio.",
  "browser-based, real-time webgl - no pre-rendering.",
  "five modes, each reacting to the sound a different way.",
  "this one taught me to design for ears, not just eyes.",
]

const somethingLurking = [
  "something lurking. the brief said calm. i shipped quietly unsettling.",
  "the tension lives in the sound and the diegetic ui, not jump scares.",
  "translating coursework into an actual puzzle was the hard part.",
]

const usAmongAi = [
  "us among ai. a reverse turing test.",
  "pretend to be the machine while an ai auditor watches for anything human.",
  "won best ui at sillyhacks. the interface IS the game.",
]

const truckingAcademy = [
  "trucking academy. a ux deep-dive into driver training and hiring.",
  "the challenge: getting a commercial license is a maze.",
  "key insight - drivers couldn't see how a course moved them toward a license.",
  "the fix: one path, bite-sized modules, a job board, and a forum.",
  "ben's journey to a class 3 - the whole flow, end to end.",
]

const GUIDES = {
  pharmabotics,
  'asl-express': aslExpress,
  'market-basket': marketBasket,
  'bc-connect': bcConnect,
  foresee,
  'parpro-consulting': parpro,
  documentor,
  blu,
  'spectral-bloom': spectralBloom,
  'something-lurking': somethingLurking,
  'us-among-ai': usAmongAi,
  'trucking-academy': truckingAcademy,
}

export function guideForPath(pathname) {
  if (pathname === '/') return home
  if (pathname === '/work') return work
  if (pathname.startsWith('/about')) return about
  if (pathname.startsWith('/arcade')) return arcade
  if (pathname.startsWith('/projects/')) {
    const slug = pathname.split('/')[2] || ''
    if (slug === 'nightshift') return null
    return GUIDES[slug] || generic
  }
  return null
}
