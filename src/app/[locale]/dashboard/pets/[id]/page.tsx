import { createClient } from '@/lib/supabase/server'
import { Pet } from '@/types'
import { notFound } from 'next/navigation'

interface PetPageProps {
  params: Promise<{ id: string; locale: string }>
}

const PetPage = async ({ params }: PetPageProps) => {
  const { id } = await params
  const supabase = await createClient()

  const { data: pet } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()

  if (!pet) notFound()

  return (
    <main className="min-h-screen p-8" style={{ background: 'var(--bg-base)' }}>
      <pre className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {JSON.stringify(pet as Pet, null, 2)}
      </pre>
    </main>
  )
}

export default PetPage