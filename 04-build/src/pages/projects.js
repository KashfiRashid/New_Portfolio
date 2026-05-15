/**
 * Project registry — single source of truth for portfolio projects.
 *
 * Home reads `featured` to show the Featured Work cards.
 * Work reads the whole list as the archive.
 * ProjectRoute uses `component` to render the case study at
 * /projects/<slug> — entries with `component: null` show a graceful
 * "coming soon" instead of a real page.
 *
 * To add a project: add one entry here. That is the only file to touch.
 * To give an existing project a real case study: build the page under
 * src/pages/<slug>/ and set its `component` here.
 */
import BCConnectPage from './bc-connect/index.jsx'
import BLUPage from './blu/index.jsx'
import SpectralBloomPage from './spectral-bloom/index.jsx'

export const PROJECTS = [
  {
    slug: 'bc-connect',
    name: 'BC Connect',
    blurb: 'open ground design system + six frontend features built in antigravity.',
    featured: true,
    bubbleId: 'H20',
    component: BCConnectPage,
  },
  {
    slug: 'blu',
    name: 'BLU',
    blurb: 'proudest of the sound. the moment that matters is 0:42.',
    featured: true,
    bubbleId: 'H17',
    component: BLUPage,
  },
  {
    slug: 'spectral-bloom',
    name: 'Spectral Bloom',
    blurb: 'an audio visualizer with an AI layer that reads the mood of the music, not just its volume.',
    featured: true,
    bubbleId: 'H18',
    component: SpectralBloomPage,
  },
  {
    slug: 'something-lurking',
    name: 'Something Lurking',
    blurb: 'the brief said calm. i shipped quietly unsettling.',
    featured: false,
    bubbleId: 'H19',
    component: null,
  },
  {
    slug: 'pitchflow',
    name: 'PitchFlow',
    blurb: 'the pitch deck that won the room.',
    featured: false,
    bubbleId: 'H21',
    component: null,
  },
  {
    slug: 'foresee',
    name: 'ForeSee',
    blurb: '[real description needed].',
    featured: false,
    bubbleId: 'H22',
    component: null,
  },
]

/** Older work — listed by name on the Work archive, no case study pages. */
export const OLDER_WORK = [
  { slug: 'documentor-app', name: 'Documentor App' },
  { slug: 'parpro', name: 'Parpro Consulting' },
  { slug: 'trucking-academy', name: 'Trucking Academy' },
]

/** Look up a single project by slug. Returns null if not found. */
export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug) || null
