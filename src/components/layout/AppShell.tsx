import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      <Sidebar />
      <main className="flex-1 pb-16 md:pb-0 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default AppShell;