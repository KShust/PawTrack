import Link from 'next/link'
import { Pet } from '@/types'
import Avatar from '@/components/ui/Avatar'
import HealthBar from '@/components/ui/HealthBar'

interface PetHeroCardProps {
  pet: Pet
  color: string
  colorLight: string
}

const HEALTH_SCORE_HARDCODE = 75

const PetHeroCard = ({ pet, color, colorLight }: PetHeroCardProps) => {
  return (
    <Link href={`/dashboard/pets/${pet.id}`}>
      <div
        className="flex items-center gap-4 p-4 rounded-3xl cursor-pointer"
        style={{
          background: colorLight,
          border: `1px solid ${color}`,
        }}
      >
        <Avatar
          photoUrl={pet.photo_url}
          petType={pet.type}
          name={pet.name}
          size="md"
          color={color}
          variant="white"
        />
        <div className="flex-1 min-w-0">
          <div className="text-heading-3">{pet.name}</div>
          <div className="text-caption mb-2">{pet.breed ?? '—'}</div>
          <HealthBar score={HEALTH_SCORE_HARDCODE} color={color} showLabel />
        </div>
      </div>
    </Link>
  )
}

export default PetHeroCard