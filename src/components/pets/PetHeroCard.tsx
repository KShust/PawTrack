'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Pet } from '@/types'
import { PetPalette } from '@/lib/petColors'
import Avatar from '@/components/ui/Avatar'
import HealthBar from '@/components/ui/HealthBar'

interface PetHeroCardProps {
  pet: Pet
  palette: PetPalette
}

const HEALTH_SCORE_HARDCODE = 75

const PetHeroCard = ({ pet, palette }: PetHeroCardProps) => {
  const t = useTranslations('PetCard')

  return (
    <Link
      href={`/dashboard/pets/${pet.id}`}
      className="flex items-center gap-4 p-4 rounded-3xl"
      style={{
        background: palette.bg,
        border: `1px solid ${palette.solid}`,
      }}
    >
      <Avatar
        photoUrl={pet.photo_url}
        petType={pet.type}
        name={pet.name}
        size="md"
        color={palette.solid}
        variant="contrast"
      />
      <div className="flex-1 min-w-0">
        <div className="text-heading-3">{pet.name}</div>
        <div className="text-caption mb-2">{pet.breed ?? '—'}</div>
        <HealthBar
          score={HEALTH_SCORE_HARDCODE}
          color={palette.solid}
          label={t('healthScoreOf', { name: pet.name })}
          showLabel
        />
      </div>
    </Link>
  )
}

export default PetHeroCard
