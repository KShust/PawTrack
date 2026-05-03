import Image from 'next/image'
import { Cat, Dog } from 'lucide-react'
import { PetType } from '@/types'

interface AvatarProps {
  photoUrl?: string | null
  petType?: PetType
  name: string
  size: 'xs' | 'sm' | 'md' | 'lg'
  color: string
  variant?: 'default' | 'white'
}

const sizes = {
  xs: { box: 32, icon: 16 },
  sm: { box: 40, icon: 20 },
  md: { box: 80, icon: 40 },
  lg: { box: 120, icon: 60 },
}

const Avatar = ({ photoUrl, petType, name, size, color, variant = 'default' }: AvatarProps) => {
  const { box, icon } = sizes[size]
  const PetIcon = petType === 'cat' ? Cat : Dog

  return (
    <div
      className={variant === 'white' ? 'avatar-placeholder-white' : 'avatar-placeholder'}
      style={{ width: box, height: box }}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          width={box}
          height={box}
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        <PetIcon size={icon} color={color} strokeWidth={1.5} />
      )}
    </div>
  )
}

export default Avatar