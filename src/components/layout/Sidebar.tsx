'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { navItems } from '@/config/navigation';
import { PawPrint } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');

  return (
    <aside className="hidden md:flex flex-col w-16 lg:w-60 h-screen sticky top-0 border-r border-[var(--border)] bg-[var(--bg-surface)] px-2 py-5 gap-1">

      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-6">
        <div
          className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--tint-primary-strong)' }}
        >
          <PawPrint size={18} color="var(--text-on-solid)" aria-hidden="true" />
        </div>
        <p className="hidden lg:block font-bold text-sm text-[var(--text-primary)]">
          PawTrack
        </p>
      </div>

      <nav aria-label={t('primaryLabel')} className="flex flex-col gap-1">
        {/* Menu label */}
        <p className="hidden lg:block text-label px-3 mb-1">
          {t('menu')}
        </p>

        {navItems.map(({ key, href, icon: Icon }) => {
          const fullHref = `/${locale}${href}`;
          const isActive = pathname.startsWith(fullHref);

          return (
            <Link
              key={key}
              href={fullHref}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive ? 'nav-item-active' : 'nav-item'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" aria-hidden="true" />
              {/* Visually collapsed on the icon-only rail, but still announced. */}
              <span className="sr-only lg:not-sr-only text-sm">{t(key)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
