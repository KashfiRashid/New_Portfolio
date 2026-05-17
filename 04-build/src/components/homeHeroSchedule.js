/**
 * homeHeroSchedule — the homepage hero's time engine.
 *
 * The hero is a window into Kash's day. The video and the status line
 * swap based on the current hour in America/Vancouver (Kash's timezone,
 * deliberately — viewers see his day, not theirs).
 *
 * HONESTY RULE
 * Only `working` has a real video file today. The other three scenes
 * have intended filenames but available:false. The hero falls back to
 * the working video for any unavailable slot, so the clock and the
 * status text still swap by time even with one asset. To enable a new
 * scene later, drop the file at the listed path and flip available:true.
 * Two-line change per video. No other code touched.
 */

export const HOME_HERO_SCENES = {
  asleep: {
    id: 'asleep',
    video: '/home/scene-asleep.mp4',
    status: 'now: asleep. the studio is quiet.',
    available: false,
  },
  transit: {
    id: 'transit',
    video: '/home/scene-transit.mp4',
    status: 'now: in transit.',
    available: false,
  },
  meal: {
    id: 'meal',
    video: '/home/scene-meal.mp4',
    status: 'now: lunch. away from the desk.',
    available: false,
  },
  working: {
    id: 'working',
    video: '/home/scene-working.mp4',
    status: 'now: heads-down at the desk.',
    available: true,
  },
}

export const HOME_HERO_POSTER = '/home/hero-poster.webp'
export const HOME_HERO_POSTER_FALLBACK = '/home/hero-poster.jpg'

/**
 * Returns the hour [0-23] in America/Vancouver for the given Date.
 * Uses Intl.DateTimeFormat so the result is correct regardless of the
 * viewer's local timezone (which would otherwise return the wrong scene
 * for anyone outside PT).
 */
export function getVancouverHour(date = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Vancouver',
    hour: 'numeric',
    hour12: false,
  })
  // hour: 'numeric' with hour12 false returns "00".."23"
  const h = parseInt(fmt.format(date), 10)
  return Number.isFinite(h) ? h : new Date(date).getUTCHours()
}

/**
 * Returns the ticking time + place line shown in the top-left of the hero.
 * Format: "HH:MM:SS PT · Delta, BC"
 * Uses tabular numerals at the CSS layer so the width does not jitter.
 */
export function getVancouverTimeString(date = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  // en-CA returns "HH:MM:SS"
  const t = fmt.format(date)
  // Detect PT vs PST/PDT label — Intl gives short generic if we ask. Keep it simple.
  const tzFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Vancouver',
    timeZoneName: 'short',
  })
  const parts = tzFmt.formatToParts(date)
  const tz = parts.find((p) => p.type === 'timeZoneName')?.value || 'PT'
  return `${t} ${tz} · Delta, BC`
}

/**
 * Picks the active scene based on the Vancouver hour.
 *
 * Schedule (Vancouver local time):
 *   00:00 - 05:59 → asleep
 *   06:00 - 10:59 → transit
 *   11:30 - 14:00 → meal     (handled by minute check below)
 *   all other     → working
 *
 * If the chosen scene is not available, returns the working scene's
 * video but keeps the chosen scene's status text. This way the time
 * awareness reads as real even before the other videos exist.
 */
export function getActiveScene(date = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Vancouver',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  const parts = fmt.formatToParts(date)
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10)
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10)
  const minutesOfDay = hour * 60 + minute

  let chosen
  if (minutesOfDay >= 0 && minutesOfDay < 6 * 60) {
    chosen = HOME_HERO_SCENES.asleep
  } else if (minutesOfDay >= 6 * 60 && minutesOfDay < 11 * 60) {
    chosen = HOME_HERO_SCENES.transit
  } else if (minutesOfDay >= 11 * 60 + 30 && minutesOfDay <= 14 * 60) {
    chosen = HOME_HERO_SCENES.meal
  } else {
    chosen = HOME_HERO_SCENES.working
  }

  // Availability fallback: keep chosen status text, but play the working
  // video if the chosen scene's file isn't on disk yet.
  const resolvedVideo = chosen.available
    ? chosen.video
    : HOME_HERO_SCENES.working.video

  return {
    id: chosen.id,
    status: chosen.status,
    video: resolvedVideo,
    isFallbackVideo: !chosen.available,
  }
}
