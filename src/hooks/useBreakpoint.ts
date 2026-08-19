'use client'

import { useSyncExternalStore } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

/** Mirrors the Tailwind `md` / `lg` screens used across the layout. */
const TABLET_QUERY = '(min-width: 768px)'
const DESKTOP_QUERY = '(min-width: 1024px)'

const subscribe = (onChange: () => void) => {
  const queries = [window.matchMedia(TABLET_QUERY), window.matchMedia(DESKTOP_QUERY)]
  queries.forEach(query => query.addEventListener('change', onChange))
  return () => queries.forEach(query => query.removeEventListener('change', onChange))
}

const getSnapshot = (): Breakpoint => {
  if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop'
  if (window.matchMedia(TABLET_QUERY).matches) return 'tablet'
  return 'mobile'
}

/** Server render has no viewport; the desktop layout is the safest default. */
const getServerSnapshot = (): Breakpoint => 'desktop'

/**
 * Reads the current breakpoint from `matchMedia` rather than a resize
 * listener + state, so the value is correct on the first client render
 * instead of flashing the desktop layout on a phone.
 */
const useBreakpoint = (): Breakpoint =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

export default useBreakpoint
