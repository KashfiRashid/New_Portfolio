// Page Guide content - the companion's "docent" mode.
// One ordered array per route: index 0 is the greeting (fired on entry),
// the rest are scroll beats (one fires as each section comes on screen).
// Scoped per page - the guide only ever talks about where you are.
// Voice: Kash, lowercase, dry, specific, "2am studio." No dashes. Pure ASCII.

const home = [
  "this is home. the line up top isn't a typo. read it twice.",
  "featured first. the strongest work leads, on purpose.",
  "past the fold is everything else i've made.",
  "still scrolling? respect. there's a space shooter to play down here.",
]

const work = [
  "the archive. strongest projects first, never alphabetical.",
  "filter by kind up top if you're hunting something specific.",
  "every card is a real thing i shipped. click in.",
]

const about = [
  "the about page. less resume, more who i actually am.",
  "the wall up there is the hobbies. the rows below are the receipts.",
  "experience, then awards, then education. say hi at the bottom.",
]

const arcade = [
  "the arcade. a space shooter i built in my first year.",
  "click to start, then survive. your best score sticks around.",
]

const clickerForge = [
  "clicker forge. my first real java project. a blacksmith you actually operate.",
  "i pitched a full weaponsmith sim, then cut it to one blade done well.",
  "every sprite here is hand drawn. i was the artist and the engineer.",
  "the rooms walk you through it. smelt the copper, hammer it true, dress the blade.",
  "i built it in stages. each one earned a real mechanic.",
  "under the hood sits a base class, a factory, and a decorator chain. oop finally clicked.",
  "the smoke and the shockwaves aren't sprites. they're perlin noise and recursion.",
]

const aslExpress = [
  "asl express. won best hardware, and it started personal.",
  "the gap was a video call with my cousin. that's the why.",
  "you order food with hand signs. you never touch anything.",
  "i handled the front end and the recognition model both.",
  "honest framing here. what's real, and what we staged for the demo.",
  "it grew out of a research project called signify.",
]

const pharmabotics = [
  "pharmabotics. the build i'm proudest of on the hardware side.",
  "the problem first. why a fingerprint locked pill dispenser even needs to exist.",
  "this stretch is the part i built. the mechanism and the embedded code.",
  "the honest bit. what broke, and the water feature we cut.",
  "fifteen out of fifteen dispenses at the showcase. it actually worked.",
]

const bcConnect = [
  "bc connect. the one where i built a whole design system first.",
  "open ground. white, forest green, no dark mode cop out.",
  "six production frontend features, all grown from that one system.",
]

const foresee = [
  "foresee. a finance app that thinks in events, not just transactions.",
  "it sorts your spending into social boards you can actually share.",
  "the ai predicts what an upcoming event will cost before it hits.",
  "the voice orb is the signature feature. it won best use of elevenlabs.",
]

const parpro = [
  "parpro consulting. a three day interaction design sprint.",
  "redesigning the site for a canadian bookkeeping firm.",
  "tight timeline, real client, real constraints.",
  "the rebuild came out clearer, calmer, easier to trust.",
]

const documentor = [
  "documentor. a mobile guide for settling into a new city.",
  "built from lived experience. i knew this problem firsthand.",
  "for international students, the part nobody warns you about.",
  "small, careful, human. that was the whole goal.",
]

const marketBasket = [
  "market basket. the data project. the real story is restraint.",
  "we over engineered the recommender first. three percent accuracy. ouch.",
  "then a plain knn model hit thirty eight percent. simpler won.",
  "the demo runs both models live. see it for yourself.",
]

const blu = [
  "blu. a three act cg animated short.",
  "the twist is that sound carries the story, not the visuals.",
  "listen at 0:42. that part took three takes.",
]

const spectralBloom = [
  "spectral bloom. visuals that actually listen to the audio.",
  "browser based, real time webgl. nothing pre rendered.",
  "an ai layer reads the track's mood, not just its volume.",
  "this one taught me to design for ears, not just eyes.",
]

const somethingLurking = [
  "something lurking. the brief said calm. i shipped quietly unsettling.",
  "vr horror on a failing space station. the antagonist is the sound.",
  "the tension lives in the audio and the diegetic ui. no jump scares.",
]

const usAmongAi = [
  "us among ai. a reverse turing test.",
  "pretend to be the machine while an ai auditor hunts for anything human.",
  "won best ui at sillyhacks. the interface is the game.",
]

const truckingAcademy = [
  "trucking academy. a ux deep dive into driver training and hiring.",
  "the challenge: getting a commercial license is a maze.",
  "ten driver interviews, three personas, one workshop. all real research.",
  "the insight was that drivers couldn't see how a course moved them toward a license.",
  "so the fix is one path, bite size modules, a job board, and a forum.",
]

const generic = [
  "this one's a real project. take your time with it.",
  "the side nav up top jumps between sections if you want.",
]

const GUIDES = {
  'clicker-forge': clickerForge,
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
// end pageGuide.js
