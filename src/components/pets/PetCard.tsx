'use client'

import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Pet } from '@/types'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Chip from '@/components/ui/Chip'
import HealthBar from '@/components/ui/HealthBar'
import { formatAge } from '@/lib/formatAge'

interface PetCardProps {
  pet: Pet
  color: string
  colorLight: string
  isActive: boolean
  isExpanded: boolean
  isTablet: boolean
  hasExpanded?: boolean
  onClick: () => void
}

const HEALTH_SCORE_HARDCODE = 75

const PetCard = ({ pet, color, colorLight, isActive, isExpanded, isTablet, hasExpanded, onClick }: PetCardProps) => {
    const t = useTranslations('PetCard')

  return (
    <Card
      onClick={onClick}
  className={`transition-all duration-300 h-full ${
  isTablet && !isActive && hasExpanded ? 'p-3' : 'p-5'
}`}
  style={{
    background: isActive ? colorLight : 'var(--bg-surface)',
    borderColor: isActive ? color : 'var(--border)',
  }}
    >
      {isExpanded ? (
        /* ── Expanded ─────────────────────────────────────── */
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5">
          {/* Avatars */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Avatar
  photoUrl={pet.photo_url}
  petType={pet.type}
  name={pet.name}
  size="md"
  color={color}
  variant="white"
/>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="text-heading-3">{pet.name}</div>
                <div className="text-caption">{pet.breed ?? '—'}</div>
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
<Chip 
  label={t(pet.sex === 'male' ? 'male' : 'female')} 
  sublabel={t('sex')} 
  variant="outline" 
/>

<Chip 
  label={formatAge(pet.birth_date, t)} 
  sublabel={t('age')} 
  variant="outline" 
/>

{pet.weight_kg && (
  <Chip 
    label={`${pet.weight_kg} ${t('kg')}`} 
    sublabel={t('weight')} 
    variant="outline" 
  />
)}

<Chip
  label={`${HEALTH_SCORE_HARDCODE}/100`}
  sublabel={t('health')}
  variant="outline"
  textColor={color}
/>
              
            </div>
          </div>
        </div>
      ) : (
  /* ── Compact ──────────────────────────────────────── */
  <div className={`flex h-full ${
    isTablet && !isActive && hasExpanded 
      ? 'justify-center items-center' 
      : 'items-center gap-3'
  }`}>
    <Avatar
  photoUrl={pet.photo_url}
  petType={pet.type}
  name={pet.name}
  size="md"
  color={color}
/>
    {(!isTablet || !hasExpanded || isActive) && (
      <div className="flex-1 min-w-0">
        <div className="text-heading-3 truncate">{pet.name}</div>
        <div className="text-caption truncate">{pet.breed ?? '—'}</div>
        <div className="mt-2">
          <HealthBar score={HEALTH_SCORE_HARDCODE} color={color} />
        </div>
      </div>
    )}
  </div>
)}
    </Card>
  )
}

export default memo(PetCard)