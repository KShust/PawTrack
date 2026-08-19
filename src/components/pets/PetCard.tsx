'use client'

import { useTranslations } from 'next-intl'
import { Pet } from '@/types'
import { PetPalette } from '@/lib/petColors'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Chip from '@/components/ui/Chip'
import HealthBar from '@/components/ui/HealthBar'
import { formatAge } from '@/lib/formatAge'

interface PetCardProps {
  pet: Pet
  palette: PetPalette
  isActive: boolean
  isExpanded: boolean
  isTablet: boolean
  hasExpanded?: boolean
  onClick: () => void
}

const HEALTH_SCORE_HARDCODE = 75

const PetCard = ({ pet, palette, isActive, isExpanded, isTablet, hasExpanded, onClick }: PetCardProps) => {
  const t = useTranslations('PetCard')
  const isCollapsedRail = isTablet && !isActive && hasExpanded

  return (
    <Card
      onClick={onClick}
      ariaExpanded={isExpanded}
      /* Collapsed to an avatar only: without this the button has no name at all
         for a pet with no photo, since the fallback icon is decorative. */
      ariaLabel={isCollapsedRail ? pet.name : undefined}
      className={`transition-all h-full ${isCollapsedRail ? 'p-3' : 'p-5'}`}
      style={{
        background: isActive ? palette.bg : 'var(--bg-surface)',
        borderColor: isActive ? palette.solid : 'var(--border)',
        transitionDuration: 'var(--duration-base)',
        transitionTimingFunction: 'var(--ease-standard)',
      }}
    >
      {isExpanded ? (
        /* ── Expanded ─────────────────────────────────────── */
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5">
          <Avatar
            photoUrl={pet.photo_url}
            petType={pet.type}
            name={pet.name}
            size="md"
            color={palette.solid}
            variant="contrast"
          />

          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <div className="text-heading-3">{pet.name}</div>
              <div className="text-caption">{pet.breed ?? '—'}</div>
            </div>

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
                textColor={palette.fg}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ── Compact ──────────────────────────────────────── */
        <div className={`flex h-full ${isCollapsedRail ? 'justify-center items-center' : 'items-center gap-3'}`}>
          <Avatar
            photoUrl={pet.photo_url}
            petType={pet.type}
            name={pet.name}
            size="md"
            color={palette.solid}
          />
          {!isCollapsedRail && (
            <div className="flex-1 min-w-0">
              <div className="text-heading-3 truncate">{pet.name}</div>
              <div className="text-caption truncate">{pet.breed ?? '—'}</div>
              <div className="mt-2">
                <HealthBar
                  score={HEALTH_SCORE_HARDCODE}
                  color={palette.solid}
                  label={t('healthScoreOf', { name: pet.name })}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default PetCard
