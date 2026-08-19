import { getTranslations } from 'next-intl/server';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const AppShell = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations('Navigation');

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      {/* First tab stop on every page: lets keyboard users jump past the nav. */}
      <a href="#main-content" className="skip-link">
        {t('skipToContent')}
      </a>

      <Sidebar />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 pb-16 md:pb-0 overflow-y-auto"
      >
        {children}
      </main>

      <BottomNav />
    </div>
  );
};

export default AppShell;
