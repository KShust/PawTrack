import { createClient } from '@/lib/supabase/server'
import { getCurrentUserId } from '@/lib/auth'
import { Pet } from '@/types'
import PetSelector from '@/components/pets/PetSelector'
import { getTranslations } from 'next-intl/server';

const DashboardPage = async () => {
  const t = await getTranslations( 'Dashboard' );
  const supabase = await createClient()
  const userId = getCurrentUserId()

  const { data: pets } = await supabase
    .from('pets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  return (
    <main className="min-h-screen p-8" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-heading-1 mb-6">{t('title')}</h1>
        <PetSelector pets={Array.isArray(pets) ? (pets as Pet[]) : []} />
      </div>
    </main>
  )
}

export default DashboardPage