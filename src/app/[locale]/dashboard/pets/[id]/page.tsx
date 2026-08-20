import { createClient } from '@/lib/supabase/server'
import { getCurrentUserId } from '@/lib/auth'
import { Pet } from '@/types'
import { notFound } from 'next/navigation'
import PetProfileClient from '@/components/pets/profile/PetProfileClient'

interface PetPageProps {
  params: Promise<{ id: string; locale: string }>
}

const PetPage = async ({ params }: PetPageProps) => {
  const { id } = await params
  const supabase = await createClient()
  const userId = getCurrentUserId()

  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) throw new Error('Failed to load pets')

  const pets = (data ?? []) as Pet[]
  const paletteIndex = pets.findIndex(pet => pet.id === id)

  if (paletteIndex === -1) notFound()

  return <PetProfileClient pet={pets[paletteIndex]} paletteIndex={paletteIndex} />
}

export default PetPage
