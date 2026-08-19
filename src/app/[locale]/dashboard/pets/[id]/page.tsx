import { createClient } from '@/lib/supabase/server'
import { Pet } from '@/types'
import { notFound } from 'next/navigation'
import PetProfileClient from '@/components/pets/profile/PetProfileClient'

interface PetPageProps {
  params: Promise<{ id: string; locale: string }>
}

const PetPage = async ({ params }: PetPageProps) => {
  const { id } = await params
  const supabase = await createClient()

  const { data: pet, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !pet) notFound()

  return <PetProfileClient pet={pet as Pet} />
}

export default PetPage