/**
 * Project registry - single source of truth for portfolio projects.
 *
 * Home reads `featured` to show the Featured Work cards.
 * Work reads the whole list as the archive (with `kind`-based filtering).
 * ProjectRoute uses `component` to render the case study at
 * /projects/<slug> - entries with `component: null` show a graceful
 * "coming soon" instead of a real page.
 *
 * Featured set is currently the four design-engineer ships:
 *   BC Connect, ForeSee, Parpro Consulting, DocuMentor.
 * Everything else is featured: false and shows in the homepage's
 * "more in the studio" collage that funnels to /work.
 *
 * Each project has two taxonomy fields:
 *   - `category` (string): granular descriptor shown on the card pill
 *     (e.g. "Design System", "Game Design", "3D Animation"). Semantic
 *     truth, never collapsed.
 *   - `kind` ('ux' | 'product' | 'engineering' | '3d'): broad
 *     HR-vocabulary bucket that powers the /work filter chips. Each
 *     value maps to a job-title recruiters actually search for, so the
 *     filter row reads like a role-skills index.
 *
 *     ux          - research-led, mobile UX, web redesign
 *     product     - full product design + design systems
 *     engineering - creative coding, tools, AI-mechanic builds
 *     3d          - 3D animation, VR, real-time 3D work
 */
import { lazy } from 'react'

const BCConnectPage = lazy(() => import('./bc-connect/index.jsx'))
const BLUPage = lazy(() => import('./blu/index.jsx'))
const SpectralBloomPage = lazy(() => import('./spectral-bloom/index.jsx'))
const SomethingLurkingPage = lazy(() => import('./something-lurking/index.jsx'))
const ParproConsultingPage = lazy(() => import('./parpro-consulting/index.jsx'))
const DocumentorPage = lazy(() => import('./documentor/index.jsx'))
const NightshiftPage = lazy(() => import('./nightshift/index.jsx'))
const UsAmongAiPage = lazy(() => import('./us-among-ai/index.jsx'))
const ForeseePage = lazy(() => import('./foresee/index.jsx'))
const TruckingAcademyPage = lazy(() => import('./trucking-academy/index.jsx'))
const AslExpressPage = lazy(() => import('./asl-express/index.jsx'))
const PharmaBoticsPage = lazy(() => import('./pharmabotics/index.jsx'))
const MarketBasketPage = lazy(() => import('./market-basket/index.jsx'))

export const PROJECTS = [
  {
    slug: 'asl-express',
    name: 'ASL Express',
    category: 'Accessibility / AI + Hardware',
    kind: 'engineering',
    blurb: 'A touchless food-ordering system that lets deaf and non-verbal people order with hand signs. Won Best Hardware at StormHacks 2025.',
    image: '/asl-express/Interface_Intro.png',
    color: '#10B981',
    featured: true,
    bubbleId: 'H29',
    component: AslExpressPage,
  },
  {
    slug: 'pharmabotics',
    name: 'PharmaBotics',
    category: 'Physical Computing',
    kind: 'engineering',
    blurb: 'An autonomous, fingerprint-secured pill dispenser - a full-stack React/Node/Arduino build. Demoed 15/15 at the SFU showcase.',
    image: '/pharmabotics/hero.png',
    color: '#14B8A6',
    featured: true,
    bubbleId: 'H30',
    component: PharmaBoticsPage,
  },
  {
    slug: 'bc-connect',
    name: 'BC Connect',
    category: 'Design System',
    kind: 'product',
    blurb: 'A startup directory for British Columbia, built on a custom design system with six production frontend features.',
    image: '/bc-connect/hero.png',
    color: '#3B6E8F',
    featured: true,
    bubbleId: 'H20',
    component: BCConnectPage,
  },
  {
    slug: 'foresee',
    name: 'ForeSee',
    category: 'Product Design',
    kind: 'product',
    blurb: 'A personal finance app that organizes spending into social boards and uses AI to predict what upcoming events will cost.',
    image: '/foresee/hero.png',
    color: '#6366F1',
    featured: true,
    bubbleId: 'H22',
    component: ForeseePage,
  },
  {
    slug: 'parpro-consulting',
    name: 'Parpro Consulting',
    category: 'Web Design',
    kind: 'ux',
    blurb: 'A 3-day interaction design sprint redesigning the site for a Canadian bookkeeping firm.',
    image: '/parpro/Parpro-hero.png',
    featured: true,
    bubbleId: 'H23',
    component: ParproConsultingPage,
  },
  {
    slug: 'documentor',
    name: 'DocuMentor',
    category: 'UX Design',
    kind: 'ux',
    blurb: 'A mobile guide that helps international students settle into a new city - designed from lived experience.',
    image: '/documentor/App.png',
    featured: true,
    bubbleId: 'H24',
    component: DocumentorPage,
  },
  {
    slug: 'market-basket',
    name: 'Market Basket Analysis',
    category: 'Machine Learning / Data Science',
    kind: 'engineering',
    blurb: 'A dual-AI retail system that predicts high-value customers and the next item in a cart - a study in choosing simple over complex.',
    image: '/market-basket/demo-hero.jpg',
    color: '#E8B86A',
    featured: false,
    bubbleId: 'H36',
    component: MarketBasketPage,
  },
  {
    slug: 'blu',
    name: 'BLU',
    category: '3D Animation',
    kind: '3d',
    blurb: 'A 3-act CG animated short film where sound, not the visuals, carries the story.',
    image: 'https://framerusercontent.com/images/dquDNrFwQ9hzCWLFQ1R8IxLEn1I.png',
    color: '#5B4B8A',
    featured: false,
    bubbleId: 'H17',
    component: BLUPage,
  },
  {
    slug: 'spectral-bloom',
    name: 'Spectral Bloom',
    category: 'Creative Coding',
    kind: 'engineering',
    blurb: "An audio visualizer with an AI layer that reads a track's mood, not just its volume.",
    image: '/spectral-bloom/mode-bloom.jpg',
    featured: false,
    bubbleId: 'H18',
    component: SpectralBloomPage,
  },
  {
    slug: 'something-lurking',
    name: 'Something Lurking',
    category: 'Game Design',
    kind: '3d',
    blurb: 'A VR sci-fi horror on a failing space station, where the antagonist is the sound.',
    image: '/something-lurking/poster.png',
    featured: false,
    bubbleId: 'H19',
    component: SomethingLurkingPage,
  },
  {
    slug: 'us-among-ai',
    name: 'Us Among AI',
    category: 'Game Design',
    kind: 'engineering',
    blurb: 'A reverse Turing test game - pretend to be the machine while an AI auditor watches for anything too human.',
    image: '/us-among-ai/landing.png',
    color: '#22897F',
    featured: false,
    bubbleId: 'H25',
    component: UsAmongAiPage,
  },
  {
    slug: 'trucking-academy',
    name: 'Trucking Academy',
    category: 'UX Design',
    kind: 'ux',
    blurb: "A mobile learning platform addressing the trucking industry's worker shortage. Ten driver interviews, three personas, one participatory workshop.",
    image: '/trucking-academy/hero.png',
    color: '#8B0000',
    featured: false,
    bubbleId: 'H26',
    component: TruckingAcademyPage,
  },
  {
    slug: 'nightshift',
    name: 'Nightshift',
    category: 'Data Analysis',
    kind: 'engineering',
    blurb: 'An AI-powered tool for turning raw data into clear, readable analysis.',
    image: '/nightshift/nightshift-poster.jpg',
    featured: false,
    bubbleId: 'H28',
    component: NightshiftPage,
    status: 'coming-soon',
  },
]

/**
 * Kind definitions - single source of truth for the /work filter chips.
 * Order here is render order; the "all" chip is rendered separately.
 */
export const KINDS = [
  { id: 'ux',          label: 'UX' },
  { id: 'product',     label: 'Product' },
  { id: 'engineering', label: 'Engineering' },
  { id: '3d',          label: '3D' },
]

/** Older work - listed by name on the Work archive, no case study pages. */
export const OLDER_WORK = []

/** Look up a project by slug. Used by ProjectRoute. */
export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug) || null
