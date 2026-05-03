'use client'

import { useState } from 'react'
import { Pet } from '@/types'
import PetCard from './PetCard'
import PetHeroCard from './PetHeroCard'
import useBreakpoint from '@/hooks/useBreakpoint'

interface PetSelectorProps {
  pets: Pet[]
}

const PET_COLORS = [
  { main: 'var(--color-primary)',  light: 'var(--color-primary-light)' },
  { main: 'var(--color-accent)',   light: 'var(--color-accent-light)'  },
  { main: 'var(--color-purple)',   light: 'var(--color-purple-light)'  },
  { main: 'var(--color-blue)',     light: 'var(--color-blue-light)'    },
]

const getColor = (i: number) => PET_COLORS[i % PET_COLORS.length]

const PetSelector = ({ pets }: PetSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(pets[0]?.id ?? null)
  const breakpoint = useBreakpoint()

  const activePet = pets[activeIndex]
  const activeColor = getColor(activeIndex)

  const handleDesktopClick = (id: string, index: number) => {
    setActiveIndex(index)
    setExpandedId(prev => prev === id ? null : id)
  }

  // ── Mobile ─────────────────────────────────────────────────
  if (breakpoint === 'mobile') {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {pets.map((pet, index) => {
            const color = getColor(index)
            const isActive = activeIndex === index
            return (
              <button
                key={pet.id}
                onClick={() => setActiveIndex(index)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: isActive ? color.main : 'var(--bg-surface)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  border: `1.5px solid ${isActive ? color.main : 'var(--border)'}`,
                }}
              >
                {pet.name}
              </button>
            )
          })}
        </div>
        {activePet && (
          <PetHeroCard
            pet={activePet}
            color={activeColor.main}
            colorLight={activeColor.light}
          />
        )}
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
        const color = getColor(index)

        return (
          <div
            key={pet.id}
            className="transition-all duration-300 self-stretch"
            style={{
              flexGrow: isExpanded ? 3 : (!hasExpanded ? 1 : 0),
              flexShrink: 0,
              flexBasis: !isExpanded && hasExpanded && breakpoint === 'tablet' ? '80px' : 'auto',
            }}
          >
            <PetCard
              pet={pet}
              color={color.main}
              colorLight={color.light}
              isActive={isActive}
              isExpanded={isExpanded}
              isTablet={breakpoint === 'tablet'}
              hasExpanded={hasExpanded}
              onClick={() => handleDesktopClick(pet.id, index)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PetSelector