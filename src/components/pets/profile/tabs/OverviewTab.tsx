import { Pet } from '@/types'
import { PetPalette } from '@/lib/petColors'
import { useTranslations } from 'next-intl'

const HEALTH_SCORE_HARDCODE = 75

interface Props {
  pet: Pet
  palette: PetPalette
}

const OverviewTab = ({ pet, palette }: Props) => {
  const t = useTranslations('PetProfile')

  return (
    <div className="flex flex-col gap-3">

      {/* Health score card */}
      <div className="surface rounded-2xl p-4 flex items-center gap-4">
        <div
          className="flex flex-col items-center justify-center w-16 h-16 rounded-full flex-shrink-0"
          style={{ background: palette.bg }}
        >
          <span className="text-xl font-bold" style={{ color: palette.fg }}>
            {HEALTH_SCORE_HARDCODE}
          </span>
          <span className="text-xs" style={{ color: palette.fg }}>/100</span>
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('overview.healthScore')}
          </p>
          <p className="text-xs" style={{ color: palette.fg }}>
            {t('overview.excellent')}
          </p>
        </div>
      </div>

      {/* Weight */}
      {pet.weight_kg && (
        <div className="surface rounded-2xl p-4">
          <p className="text-label mb-1">{t('overview.lastWeight')}</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {pet.weight_kg} {t('kg')}
          </p>
        </div>
      )}

    </div>
  )
}

export default OverviewTab
