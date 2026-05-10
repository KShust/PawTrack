'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { navItems } from '@/config/navigation';

const mobileItems = navItems.filter(({ key }) => key !== 'settings');

const BottomNav = () => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center border-t border-[var(--border)] bg-[var(--bg-card)] px-2 py-2">
      {mobileItems.map(({ key, href, icon: Icon }) => {
        const fullHref = `/${locale}${href}`;
        const isActive = pathname.startsWith(fullHref);

        return (
          <Link
  key={key}
  href={fullHref}
  style={isActive ? {
    color: 'var(--color-primary)',
    background: 'var(--color-primary-light)',
    borderRadius: '10px',
  } : {
    color: 'var(--text-secondary)',
  }}
  className="flex flex-col items-center justify-center gap-1 transition-colors flex-1 h-14"
>
  <Icon size={22} />
  {isActive && <span className="text-[10px] font-medium w-full text-center truncate px-1">{key}</span>}
</Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;