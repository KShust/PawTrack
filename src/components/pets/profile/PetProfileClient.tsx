'use client';

import { useRef, useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ArrowLeft } from 'lucide-react'
import { Pet } from '@/types'
import PetProfileHero from './PetProfileHero'
import OverviewTab from './tabs/OverviewTab'
import HealthTab from './tabs/HealthTab'
import MedicalTab from './tabs/MedicalTab'

type Tab = 'overview' | 'health' | 'medical'

const TAB_KEYS: Tab[] = ['overview', 'health', 'medical']

interface Props {
  pet: Pet
}

const PetProfileClient = ({ pet }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const router = useRouter()
  const t = useTranslations('PetProfile')

  /**
   * Arrow-key navigation between tabs, as described in the WAI-ARIA Authoring
   * Practices tabs pattern. Only the selected tab is a tab stop (roving
   * tabindex), so Tab moves out of the tablist rather than through it.
   */
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = TAB_KEYS.indexOf(activeTab)
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % TAB_KEYS.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + TAB_KEYS.length) % TAB_KEYS.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = TAB_KEYS.length - 1

    if (nextIndex === null) return

    event.preventDefault()
    const nextTab = TAB_KEYS[nextIndex]
    setActiveTab(nextTab)
    tabRefs.current[nextTab]?.focus()
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={t('back')}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <ArrowLeft size={18} color="var(--text-primary)" aria-hidden="true" />
        </button>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t('profileOf', { name: pet.name })}
        </span>
      </div>

      {/* Hero */}
      <PetProfileHero pet={pet} />

      {/* Tabs */}
      <div
        role="tablist"
        aria-label={t('tabsLabel')}
        className="flex border-b px-4 gap-1"
        style={{ borderColor: 'var(--border)' }}
      >
        {TAB_KEYS.map(key => {
          const isSelected = activeTab === key
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-selected={isSelected}
              aria-controls={`tabpanel-${key}`}
              tabIndex={isSelected ? 0 : -1}
              ref={node => { tabRefs.current[key] = node }}
              onClick={() => setActiveTab(key)}
              onKeyDown={handleTabKeyDown}
              className="px-4 py-3 text-sm font-medium transition-colors relative"
              style={{
                color: isSelected ? 'var(--tint-primary-fg)' : 'var(--text-secondary)',
                transitionDuration: 'var(--duration-fast)',
              }}
            >
              {t(`tabs.${key}`)}
              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--tint-primary-solid)' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab panel */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="px-4 py-4"
      >
        {activeTab === 'overview' && <OverviewTab pet={pet} />}
        {activeTab === 'health' && <HealthTab />}
        {activeTab === 'medical' && <MedicalTab />}
      </div>

    </div>
  )
}

export default PetProfileClient
