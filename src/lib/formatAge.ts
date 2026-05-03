type TFunction = (key: string) => string

export const formatAge = (birthDate: string | null, t: TFunction): string => {
  if (!birthDate) return '—'

  const birth = new Date(birthDate)
  const now = new Date()

  const totalMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth())

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) return `${months} ${t('mo')}`
  if (months === 0) return `${years} ${t('yr')}`
  return `${years} ${t('yr')} ${months} ${t('mo')}`
}