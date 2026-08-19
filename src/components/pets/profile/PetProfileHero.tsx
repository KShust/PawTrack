import { Pet, PetType } from '@/types'
import { PET_PALETTES, PetPalette } from '@/lib/petColors'
import Avatar from '@/components/ui/Avatar'
import Chip from '@/components/ui/Chip'
import { formatAge } from '@/lib/formatAge'
import { useTranslations } from 'next-intl'

/** On a single-pet screen there is no list index, so the species picks the tint. */
const PALETTE_BY_TYPE: Record<PetType, PetPalette> = {
  cat: PET_PALETTES[0],
  dog: PET_PALETTES[1],
}

interface Props {
  pet: Pet
}

const PetProfileHero = ({ pet }: Props) => {
  const palette = PALETTE_BY_TYPE[pet.type] ?? PET_PALETTES[0]
  const t = useTranslations('PetProfile')

  return (
    <div
      className="flex flex-col items-center px-4 pt-6 pb-8 gap-3"
      style={{ background: palette.bg }}
    >
      <Avatar
        photoUrl={pet.photo_url}
        petType={pet.type}
        name={pet.name}
        size="lg"
        color={palette.solid}
        variant="contrast"
      />

      <div className="text-center">
        <h1 className="text-heading-1">{pet.name}</h1>
        <p className="text-caption">{pet.breed ?? '—'}</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
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
      </div>
    </div>
  )
}

export default PetProfileHero
