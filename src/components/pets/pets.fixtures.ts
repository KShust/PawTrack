import { Pet } from '@/types'

/**
 * Sample pets for Storybook. Shapes match the `pets` table exactly, including
 * the nullable columns, so stories exercise the same branches as production.
 */
const BASE: Omit<Pet, 'id' | 'name' | 'type'> = {
  user_id: '00000000-0000-0000-0000-000000000001',
  sex: 'female',
  breed: 'Mixed',
  birth_date: '2021-04-12',
  weight_kg: 4.8,
  photo_url: null,
  created_at: '2024-01-10T09:00:00.000Z',
}

export const catWithPhoto: Pet = {
  ...BASE,
  id: 'pet-1',
  name: 'Mia',
  type: 'cat',
  breed: 'British Shorthair',
  photo_url: '/pet-photo-sample.svg',
}

export const dog: Pet = {
  ...BASE,
  id: 'pet-2',
  name: 'Rex',
  type: 'dog',
  sex: 'male',
  breed: 'Border Collie',
  birth_date: '2019-08-02',
  weight_kg: 18.4,
}

export const cat: Pet = {
  ...BASE,
  id: 'pet-3',
  name: 'Luna',
  type: 'cat',
  breed: 'Maine Coon',
  birth_date: '2023-11-20',
  weight_kg: 3.1,
}

/** No breed, no birth date, no weight — every optional field falls back. */
export const minimalPet: Pet = {
  ...BASE,
  id: 'pet-4',
  name: 'Bo',
  type: 'dog',
  sex: null,
  breed: null,
  birth_date: null,
  weight_kg: null,
}

/** A name long enough to trigger truncation in the compact card. */
export const longNamePet: Pet = {
  ...BASE,
  id: 'pet-5',
  name: 'Sir Reginald Fluffington III',
  type: 'cat',
  breed: 'Norwegian Forest Cat with a very long breed name',
}

export const pets: Pet[] = [catWithPhoto, dog, cat]

/** Six distinct pets, for checking that the colour palette wraps around. */
export const manyPets: Pet[] = [
  catWithPhoto,
  dog,
  cat,
  minimalPet,
  { ...cat, id: 'pet-6', name: 'Zuzu', breed: 'Siamese' },
  { ...dog, id: 'pet-7', name: 'Ozzy', breed: 'Beagle' },
]
