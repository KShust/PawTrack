'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { navItems } from '@/config/navigation';
import { PawPrint } from 'lucide-react';


const Sidebar = () => {
  const pathname = usePathname();
  const locale = useLocale();

  

  return (
    <aside className="hidden md:flex flex-col w-16 lg:w-60 h-screen sticky top-0 border-r border-[var(--border)] bg-[var(--bg-card)] px-2 py-5 gap-1">

      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-6">
        <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
           style={{ background: 'var(--color-primary)' }}>
           <PawPrint size={18} className="text-white" />
        </div>
        <div className="hidden lg:block">
          <p className="font-bold text-sm text-[var(--text-primary)]">PawTrack</p>
        </div>
      </div>

      {/* Menu label */}
      <p className="hidden lg:block text-[12px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] px-3 mb-1">
        Menu
      </p>

      {/* Nav items */}
      {navItems.map(({ key, href, icon: Icon }) => {
        const fullHref = `/${locale}${href}`;
        const isActive = pathname.startsWith(fullHref);
        
        return (
          <Link
  key={key}
  href={fullHref}
  style={isActive ? {
    background: 'var(--color-primary-light)',
    color: 'var(--color-primary-dark)',
    fontWeight: '600',
  } : {
    color: 'var(--text-secondary)',
  }}
  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:opacity-80"
>
  <Icon size={20} className="flex-shrink-0" />
  <span className="hidden lg:block text-sm">{key}</span>
</Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;