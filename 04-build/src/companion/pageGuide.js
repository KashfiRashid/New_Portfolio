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
  "what it does: the right pills, to the right person, at the right time.",
  "this stretch is my part. the mechanism and the embedded code.",
  "how it works end to end. react talks to node, node talks to the arduino.",
  "the hard problems are where it got real. timing, jams, and security.",
  "the honest bit. what broke, and the water feature we cut.",
  "fifteen out of fifteen dispenses at the showcase. it actually worked.",
]

const bcConnect = [
  "bc connect. a directory for british columbia's startup ecosystem.",
  "the system came first. i built the foundation before any feature.",
  "the ecosystem is fragmented by structure. that was the real problem.",
  "the data was problem one. discovery was problem two.",
  "i built the system the whole product runs on.",
  "every platform has a register. i chose ours first. i called it open ground.",
  "white, forest green, no dark mode cop out.",
  "restraint mattered. i built a button and never used it. that was the right call.",
  "six production features, all grown from that one system.",
]

const foresee = [
  "foresee. a finance app you actually talk to.",
  "the pitch: predict the tab, protect the vibe.",
  "money lives in social contexts, not categories. that's the whole idea.",
  "i built the part of the voice coach that feels alive.",
  "under it, multiple ai models run in parallel.",
  "it won best use of elevenlabs at mountain madness 2026.",
  "the trick i learned: the streaming is what sells the illusion.",
]

const parpro = [
  "parpro consulting. three days, a real client, a bookkeeping firm.",
  "we started by auditing the two competitors they named.",
  "the old site had four problems. everything after traces to one of them.",
  "i owned the prototype and four interaction patterns.",
  "the flow is one path. landing to consultation, no detours.",
  "wireframes proved the layout. mockups proved the brand.",
  "every interaction fixes a real problem. none added just for polish.",
  "what shipped was solid. what we missed was validation. i'll say it plainly.",
  "three days made me a sharper interaction designer.",
]

const documentor = [
  "documentor. a guide for landing in a new city and not drowning.",
  "it turns a wall of requirements into one step at a time.",
  "i was the user before i was the designer. i lived this one.",
  "so i checked my bias. designing for yourself can mean only yourself.",
  "i led the vision, tested the assumption, held the through line.",
  "the core idea: make the next step small enough that nobody freezes.",
  "four flows, one principle. sketch, structure, refine.",
  "then the people who actually had the problem confirmed the fix.",
  "it taught me to design for someone, not just like someone.",
]

const marketBasket = [
  "market basket. the data project. the real story is restraint.",
  "retail analytics is fragmented. that's the gap we went after.",
  "two questions. who will spend big, and what will they buy next.",
  "we over engineered the recommender first. three percent. ouch.",
  "then a plain knn model hit thirty eight. simpler won.",
  "the demo runs both models live, on one screen.",
  "end to end, with a partner. it taught me when to stop adding.",
]

const blu = [
  "blu. a three act cg short about desire, and the line you cross to follow it.",
  "i held the vision, built the worlds, and designed the sound.",
  "two worlds. light and life, then dark and decay.",
  "the wolf is the twist. you hear it, you never see it.",
  "sound carries the story here, not the visuals.",
  "from sketch to final, every frame was a choice.",
  "shipped, screened, complete. listen at 0:42.",
]

const spectralBloom = [
  "spectral bloom. most visualizers react to loudness. i wanted one that reads meaning.",
  "live visuals are expensive, manual, and a little bit deaf. that's the gap.",
  "i proposed a research pipeline. i shipped a leaner one.",
  "the engine asks claude one question. what should this sound look like?",
  "one pass of frequency analysis. six features, six jobs.",
  "same twelve thousand particles. five ways to see them.",
  "the whole real time engine lives in one file.",
  "six weeks taught me to design for ears, not just eyes.",
]

const somethingLurking = [
  "something lurking. a failing space station and a presence you never see.",
  "the ship is dying. you're the only one left.",
  "i wore four roles, but held one design conscience.",
  "the brief was coursework. turning it into a real puzzle was the hard part.",
  "the antagonist is the sound. that was the whole bet.",
  "no menus. the ui lives inside the world.",
  "the playtest told us what worked. we shipped what it taught us.",
  "shipped, presented, showcased. quietly unsettling, on purpose.",
]

const usAmongAi = [
  "us among ai. a reverse turing test. be a bot, or be caught.",
  "the question: can you pass as a machine?",
  "built on gemini, top to bottom. i structured it fast.",
  "how it plays. pass the audit while an ai hunts for anything human.",
  "the hard part was defining what too human even looks like.",
  "won best ui at sillyhacks 2026. the interface is the game.",
]

const truckingAcademy = [
  "trucking academy. a ux deep dive into driver training and hiring.",
  "the client thought they had a marketing problem. they didn't.",
  "so we did the research. ten drivers, three personas, one workshop.",
  "the insight: drivers couldn't see how a course moved them toward a license.",
  "we followed ben's path to a class 3 license, step by step.",
  "the fix was a learning platform, not a marketing site.",
  "three core experiences on one surface.",
  "what shipped was a complete mobile app.",
  "solve the cause, not the symptom. that was the whole point.",
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
