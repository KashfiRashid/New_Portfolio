/**
 * Project registry — single source of truth for portfolio projects.
 *
 * Home reads `featured` to show the Featured Work cards.
 * Work reads the whole list as the archive.
 * ProjectRoute uses `component` to render the case study at
 * /projects/<slug> — entries with `component: null` show a graceful
 * "coming soon" instead of a real page.
 *
 * Per-card display fields (read by components/ProjectCard.jsx):
 *   - category : a short discipline tag (e.g. Design System, UX Design)
 *   - image    : path to a hero image (served from /public), cropped to
 *                fit the card via object-cover.
 *   - color    : used INSTEAD of image when a project has no hero image,
 *                or as a fallback if the image fails to load.
 *
 * To add a project: add one entry here. That is the only file to touch.
 */
import { lazy } from 'react'

// Each case study is its own lazy() chunk — loaded only when its
// /projects/<slug> route is actually visited, never in the initial bundle.
const BCConnectPage = lazy(() => import('./bc-connect/index.jsx'))
const BLUPage = lazy(() => import('./blu/index.jsx'))
const SpectralBloomPage = lazy(() => import('./spectral-bloom/index.jsx'))
const SomethingLurkingPage = lazy(() => import('./something-lurking/index.jsx'))
const ParproConsultingPage = lazy(() => import('./parpro-consulting/index.jsx'))
const DocumentorPage = lazy(() => import('./documentor/index.jsx'))
const NightshiftPage = lazy(() => import('./nightshift/index.jsx'))
const UsAmongAiPage = lazy(() => import('./us-among-ai/index.jsx'))

export const PROJECTS = [
  {
    slug: 'bc-connect',
    name: 'BC Connect',
    category: 'Design System',
    blurb: 'A startup directory for British Columbia, built on a custom design system with six production frontend features.',
    image: '/bc-connect/hero.png',
    color: '#3B6E8F', // fallback panel if the hero image fails to load
    featured: true,
    bubbleId: 'H20',
    component: BCConnectPage,
  },
  {
    slug: 'blu',
    name: 'BLU',
    category: '3D Animation',
    blurb: 'A 3-act CG animated short film where sound, not the visuals, carries the story.',
    image: 'https://framerusercontent.com/images/dquDNrFwQ9hzCWLFQ1R8IxLEn1I.png',
    color: '#5B4B8A', // fallback panel if the remote poster fails
    featured: true,
    bubbleId: 'H17',
    component: BLUPage,
  },
  {
    slug: 'spectral-bloom',
    name: 'Spectral Bloom',
    category: 'Creative Coding',
    blurb: "An audio visualizer with an AI layer that reads a track's mood, not just its volume.",
    image: '/spectral-bloom/spectral-bloom-poster.jpg',
    featured: true,
    bubbleId: 'H18',
    component: SpectralBloomPage,
  },
  {
    slug: 'something-lurking',
    name: 'Something Lurking',
    category: 'Game Design',
    blurb: 'A VR sci-fi horror on a failing space station, where the antagonist is the sound.',
    image: '/something-lurking/fig-art-collage.png',
    featured: true,
    bubbleId: 'H19',
    component: SomethingLurkingPage,
  },
  {
    slug: 'us-among-ai',
    name: 'Us Among AI',
    category: 'Game Design',
    blurb: 'A reverse Turing test game — pretend to be the machine while an AI auditor watches for anything too human.',
    image: '/us-among-ai/landing.png',
    color: '#22897F', // fallback panel if the hero image fails to load
    featured: true,
    bubbleId: 'H25',
    component: UsAmongAiPage,
  },
  {
    slug: 'foresee',
    name: 'ForeSee',
    category: 'Product Design',
    blurb: 'A personal finance app that organizes spending into social boards and uses AI to predict what upcoming events will cost.',
    color: '#4F7A5C',
    featured: false,
    bubbleId: 'H22',
    component: null,
  },
  {
    slug: 'parpro-consulting',
    name: 'Parpro Consulting',
    category: 'Web Design',
    blurb: 'A 3-day interaction design sprint redesigning the site for a Canadian bookkeeping firm.',
    image: '/parpro/Parpro-hero.png',
    featured: false,
    bubbleId: 'H23',
    component: ParproConsultingPage,
  },
  {
    slug: 'documentor',
    name: 'DocuMentor',
    category: 'UX Design',
    blurb: 'A mobile guide that helps international students settle into a new city — designed from lived experience.',
    image: '/documentor/App.png',
    featured: true,
    bubbleId: 'H24',
    component: DocumentorPage,
  },
  {
    // Nightshift — unannounced. `status: 'coming-soon'` renders a badge.
    slug: 'nightshift',
    name: 'Nightshift',
    category: 'Data Analysis',
    blurb: 'An AI-powered tool for turning raw data into clear, readable analysis.',
    image: '/nightshift/nightshift-poster.jpg',
    featured: true,
    bubbleId: 'H28',
    component: NightshiftPage,
    status: 'coming-soon',
  },
]

/** Older work - listed by name on the Work archive, no case study pages. */
export const OLDER_WORK = [
  { slug: 'trucking-academy', name: 'Trucking Academy' },
]

/** Look up a single project by slug. Returns null if not found. */
export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug) || null
