import { useTranslations } from 'next-intl'

const MedicalTab = () => {
  const t = useTranslations('PetProfile')

  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-body">{t('comingSoon')}</p>
    </div>
  )
}

export default MedicalTab
