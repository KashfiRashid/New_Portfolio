import { useState, useEffect, useCallback } from 'react'
import { randomColor } from '../lib/colorAssignment.js'
import { DEFAULT_COLOR, findColor } from '../lib/visitorColors.js'

const STORAGE_KEY = 'kr.identity.v1'

/**
 * useVisitorIdentity - the visitor's identity, persisted to localStorage.
 *
 * The companion no longer asks for a name at the door. On a first visit we
 * silently create an anonymous identity with a random (but persisted) color,
 * so the cursor / accent tinting still works and returning visitors are still
 * recognized - all with zero friction on arrival.
 *
 * Shape stored in localStorage:
 *   { name: null, color: { id, label, hex }, firstVisitDate, lastVisitDate, visitCount }
 */
function makeAnonymous() {
  const now = new Date().toISOString()
  return {
    name: null,
    color: randomColor(),
    firstVisitDate: now,
    lastVisitDate: now,
    visitCount: 1,
  }
}

function persist(identity) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
  } catch (err) {
    console.warn('useVisitorIdentity persist failed:', err)
  }
}

export function useVisitorIdentity() {
  const [identity, setIdentity] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Hydrate from localStorage on mount - or auto-create an anonymous identity.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        const color = findColor(parsed.color?.id) || DEFAULT_COLOR
        setIdentity({
          name: parsed.name ?? null,
          color,
          firstVisitDate: parsed.firstVisitDate,
          lastVisitDate: parsed.lastVisitDate,
          visitCount: parsed.visitCount || 1,
        })
      } else {
        const anon = makeAnonymous()
        persist(anon)
        setIdentity(anon)
      }
    } catch (err) {
      // localStorage unavailable (private mode) - fail open with an in-memory identity
      console.warn('useVisitorIdentity hydrate failed:', err)
      setIdentity(makeAnonymous())
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Bump visit count + lastVisitDate on a returning visit (once per day).
  useEffect(() => {
    if (!isLoaded || !identity) return
    const last = identity.lastVisitDate ? new Date(identity.lastVisitDate) : null
    const now = new Date()
    const sameDay = last && last.toDateString() === now.toDateString()
    if (!sameDay) {
      const updated = { ...identity, lastVisitDate: now.toISOString(), visitCount: (identity.visitCount || 1) + 1 }
      persist(updated)
      setIdentity(updated)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  // Reset - clears storage and starts a fresh anonymous identity (new color).
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.warn('useVisitorIdentity reset failed:', err)
    }
    const anon = makeAnonymous()
    persist(anon)
    setIdentity(anon)
  }, [])

  return {
    identity,
    isLoaded,
    isReturning: !!identity && identity.visitCount > 1,
    reset,
  }
}
// end useVisitorIdentity.js
