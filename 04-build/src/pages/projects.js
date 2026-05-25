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
 *   - category : one of Product Design | Engineering | Creative
 *   - image    : path to a hero image (served from /public). Cropped to
 *                fit the card via object-cover.
 *   - color    : used INSTEAD of image when a project has no hero image —
 *                the card shows a themed solid-color panel.
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

export const PROJECTS = [
  {
    slug: 'bc-connect',
    name: 'BC Connect',
    category: 'Engineering',
    blurb: 'open ground design system + six frontend features built in antigravity.',
    // Save Abdul's BC Connect hero (the device mockup) to
    // public/bc-connect/hero.png — it then replaces the panel automatically.
    image: '/bc-connect/hero.png',
    color: '#3B6E8F', // fallback panel until hero.png is added
    featured: true,
    bubbleId: 'H20',
    component: BCConnectPage,
  },
  {
    slug: 'blu',
    name: 'BLU',
    category: 'Creative',
    blurb: 'proudest of the sound. the moment that matters is 0:42.',
    image: 'https://framerusercontent.com/images/dquDNrFwQ9hzCWLFQ1R8IxLEn1I.png',
    color: '#5B4B8A', // fallback panel if the remote poster fails
    featured: true,
    bubbleId: 'H17',
    component: BLUPage,
  },
  {
    slug: 'spectral-bloom',
    name: 'Spectral Bloom',
    category: 'Creative',
    blurb: 'an audio visualizer with an AI layer that reads the mood of the music, not just its volume.',
    image: '/spectral-bloom/spectral-bloom-poster.jpg',
    featured: true,
    bubbleId: 'H18',
    component: SpectralBloomPage,
  },
  {
    slug: 'something-lurking',
    name: 'Something Lurking',
    category: 'Creative',
    blurb: 'a VR sci-fi horror on a failing space station. the antagonist is the sound, not the model.',
    image: '/something-lurking/fig-art-collage.png',
    featured: true,
    bubbleId: 'H19',
    component: SomethingLurkingPage,
  },
  {
    slug: 'pitchflow',
    name: 'PitchFlow',
    category: 'Creative',
    blurb: 'the pitch deck that won the room.',
    color: '#B07D3C', // no hero image yet — themed panel
    featured: false,
    bubbleId: 'H21',
    component: null,
  },
  {
    slug: 'foresee',
    name: 'ForeSee',
    // [NEEDS KASH INPUT — ForeSee's real blurb + confirm the category]
    category: 'Product Design',
    blurb: '[real description needed].',
    color: '#4F7A5C', // no hero image yet — themed panel
    featured: false,
    bubbleId: 'H22',
    component: null,
  },
  {
    slug: 'parpro-consulting',
    name: 'Parpro Consulting',
    category: 'Product Design',
    blurb: 'a 3-day interaction design redesign for a Canadian SMB bookkeeping firm.',
    image: '/parpro/mockups.png',
    featured: false,
    bubbleId: 'H23',
    component: ParproConsultingPage,
  },
  {
    slug: 'documentor',
    name: 'DocuMentor',
    category: 'Product Design',
    blurb: 'a mobile guide for international students. i was the user before i was the designer.',
    image: '/documentor/App.png',
    featured: true,
    bubbleId: 'H24',
    component: DocumentorPage,
  },
  {
    // Nightshift — unannounced. `status: 'coming-soon'` renders a badge.
    slug: 'nightshift',
    name: 'Nightshift',
    category: 'Engineering',
    blurb: 'the next one. being built after hours.',
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
