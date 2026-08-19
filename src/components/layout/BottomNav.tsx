'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { navItems } from '@/config/navigation';

const mobileItems = navItems.filter(({ key }) => key !== 'Settings');

const BottomNav = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');

  return (
    <nav
      aria-label={t('mobileLabel')}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center border-t border-[var(--border)] bg-[var(--bg-surface)] px-2 py-2"
    >
      {mobileItems.map(({ key, href, icon: Icon }) => {
        const fullHref = `/${locale}${href}`;
        const isActive = pathname.startsWith(fullHref);

        return (
          <Link
            key={key}
            href={fullHref}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center gap-1 transition-colors flex-1 h-14 rounded-xl ${
              isActive ? 'nav-item-active' : 'nav-item'
            }`}
          >
            <Icon size={22} aria-hidden="true" />
            {/* The label is only painted for the active item, but every item
                keeps an accessible name. */}
            <span
              className={
                isActive
                  ? 'text-[10px] font-medium w-full text-center truncate px-1'
                  : 'sr-only'
              }
            >
              {t(key)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
