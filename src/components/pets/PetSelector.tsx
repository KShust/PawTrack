'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Pet } from '@/types'
import { getPetPalette } from '@/lib/petColors'
import PetCard from './PetCard'
import PetHeroCard from './PetHeroCard'
import useBreakpoint from '@/hooks/useBreakpoint'

interface PetSelectorProps {
  pets: Pet[]
}

const PetSelector = ({ pets }: PetSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(pets[0]?.id ?? null)
  const breakpoint = useBreakpoint()
  const t = useTranslations('PetSelector')

  if (pets.length === 0) {
    return <p className="text-body">{t('empty')}</p>
  }

  const activePet = pets[activeIndex]
  const activePalette = getPetPalette(activeIndex)

  const handleCardClick = (id: string, index: number) => {
    setActiveIndex(index)
    setExpandedId(prev => (prev === id ? null : id))
  }

  // ── Mobile ─────────────────────────────────────────────────
  if (breakpoint === 'mobile') {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 flex-wrap" role="group" aria-label={t('groupLabel')}>
          {pets.map((pet, index) => {
            const palette = getPetPalette(index)
            const isActive = activeIndex === index
            return (
              <button
                key={pet.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                style={{
                  background: isActive ? palette.strong : 'var(--bg-surface)',
                  color: isActive ? 'var(--text-on-solid)' : 'var(--text-secondary)',
                  border: `1.5px solid ${isActive ? palette.strong : 'var(--border-strong)'}`,
                  transitionDuration: 'var(--duration-fast)',
                }}
              >
                {pet.name}
              </button>
            )
          })}
        </div>
        {activePet && <PetHeroCard pet={activePet} palette={activePalette} />}
      </div>
    )
  }

  // ── Tablet + Desktop ───────────────────────────────────────
  return (
    <div className="flex gap-3 items-stretch">
      {pets.map((pet, index) => {
        const isExpanded = expandedId === pet.id
        const hasExpanded = expandedId !== null
        const isActive = activeIndex === index

        return (
          <div
            key={pet.id}
            className="transition-all self-stretch"
            style={{
              flexGrow: isExpanded ? 3 : (!hasExpanded ? 1 : 0),
              flexShrink: 0,
              flexBasis: !isExpanded && hasExpanded && breakpoint === 'tablet' ? '80px' : 'auto',
              transitionDuration: 'var(--duration-base)',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <PetCard
              pet={pet}
              palette={getPetPalette(index)}
              isActive={isActive}
              isExpanded={isExpanded}
              isTablet={breakpoint === 'tablet'}
              hasExpanded={hasExpanded}
              onClick={() => handleCardClick(pet.id, index)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PetSelector
