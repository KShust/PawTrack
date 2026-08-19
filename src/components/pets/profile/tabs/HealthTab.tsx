import { useTranslations } from 'next-intl'

const HealthTab = () => {
  const t = useTranslations('PetProfile')

  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-body">{t('comingSoon')}</p>
    </div>
  )
}

export default HealthTab
