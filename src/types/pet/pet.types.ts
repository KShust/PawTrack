export type PetSex = 'male' | 'female'

export type PetType = 'cat' | 'dog'

export interface Pet {
  id: string
  user_id: string
  name: string
  type: PetType
  sex: PetSex | null
  breed: string | null
  birth_date: string | null
  weight_kg: number | null
  photo_url: string | null
  created_at: string
}