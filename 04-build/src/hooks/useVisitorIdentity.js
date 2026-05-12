import { useState, useEffect, useCallback } from 'react'
import { assignColor, normalizeName } from '../lib/colorAssignment.js'
import { DEFAULT_COLOR, findColor } from '../lib/visitorColors.js'

const STORAGE_KEY = 'kr.identity.v1'

/**
 * useVisitorIdentity — reads/writes the visitor's identity to localStorage.
 *
 * Per /01-brand-book/05-wow-mechanics.md (recommended persistence option):
 *   - localStorage stores name + color + visit metadata
 *   - Returning visitors get recognized by default
 *   - Footer "reset" link clears state and re-triggers onboarding
 *
 * Shape stored in localStorage:
 *   {
 *     name: string,
 *     color: { id, label, hex },
 *     firstVisitDate: ISO,
 *     lastVisitDate: ISO,
 *     visitCount: number,
 *   }
 */
export function useVisitorIdentity() {
  const [identity, setIdentity] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        // Re-resolve color from palette in case palette changed since stored
        const color = findColor(parsed.color?.id) || DEFAULT_COLOR
        setIdentity({
          name: parsed.name,
          color,
          firstVisitDate: parsed.firstVisitDate,
          lastVisitDate: parsed.lastVisitDate,
          visitCount: parsed.visitCount || 1,
        })
      }
    } catch (err) {
      // localStorage may be unavailable in private mode / disabled — fail open
      console.warn('useVisitorIdentity hydrate failed:', err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Bump visit count + lastVisitDate on returning visit
  // (Only after we've loaded once and confirmed an identity exists.)
  useEffect(() => {
    if (!isLoaded || !identity) return
    // Use a ref-equivalent: only run once per identity-load
    const today = new Date().toISOString()
    // Don't bump on the same day to avoid inflating count on refresh
    const last = identity.lastVisitDate ? new Date(identity.lastVisitDate) : null
    const now = new Date()
    const sameDay = last && last.toDateString() === now.toDateString()
    if (!sameDay) {
      const updated = {
        ...identity,
        lastVisitDate: today,
        visitCount: (identity.visitCount || 1) + 1,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (err) {
        console.warn('useVisitorIdentity bump failed:', err)
      }
      setIdentity(updated)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  /**
   * Set a new identity from onboarding submission.
   * @param {string} rawName — what the visitor typed (or '' for skip)
   */
  const setName = useCallback((rawName) => {
    const name = normalizeName(rawName) || 'stranger'
    const color = assignColor(name === 'stranger' ? '' : name)
    const now = new Date().toISOString()
    const newIdentity = {
      name,
      color,
      firstVisitDate: now,
      lastVisitDate: now,
      visitCount: 1,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIdentity))
    } catch (err) {
      console.warn('useVisitorIdentity setName failed:', err)
    }
    setIdentity(newIdentity)
  }, [])

  /**
   * Reset — clears localStorage identity and triggers re-onboarding.
   */
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.warn('useVisitorIdentity reset failed:', err)
    }
    setIdentity(null)
  }, [])

  return {
    identity,
    isLoaded,
    isReturning: !!identity && identity.visitCount > 1,
    setName,
    reset,
  }
}
