import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  /** Pass true on the transactions page to show the mobile FAB */
  showMobileFab?: boolean;
  onFabClick?: () => void;
}

export default function DashboardLayout({
  children,
  showMobileFab,
  onFabClick,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Fixed Top Bar (offset by sidebar on md+) */}
      <TopBar />

      {/* Page Content */}
      <main className="md:ml-72 pt-20 pb-24 md:pb-8 px-4 md:px-8 max-w-[1600px] mx-auto">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav showFab={showMobileFab} onFabClick={onFabClick} />
    </div>
  );
}
