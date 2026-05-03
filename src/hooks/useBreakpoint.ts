'use client'

import { useCallback, useEffect, useState } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop')

  const check = useCallback(() => {
    const w = window.innerWidth
    if (w < 768) setBreakpoint('mobile')
    else if (w < 1024) setBreakpoint('tablet')
    else setBreakpoint('desktop')
  }, [])

  useEffect(() => {
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [check])

  return breakpoint
}

export default useBreakpoint