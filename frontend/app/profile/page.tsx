import DashboardLayout from '../components/layout/DashboardLayout';
import UserProfileHeader from '../components/profile/UserProfileHeader';
import AccountSettings from '../components/profile/AccountSettings';
import SecuritySection from '../components/profile/SecuritySection';
import MembershipCard from '../components/profile/MembershipCard';
import AppPreferences from '../components/profile/AppPreferences';
import DangerZone from '../components/profile/DangerZone';
import { DownloadCloud } from 'lucide-react';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="pt-8 pb-28 max-w-5xl mx-auto space-y-12 relative">
        {/* Atmospheric Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-container/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-tertiary-container/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <UserProfileHeader />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Settings */}
          <div className="lg:col-span-2 space-y-8">
            <AccountSettings />
            <SecuritySection />
          </div>

          {/* Right Column: Membership & Preferences */}
          <div className="space-y-8">
            <MembershipCard />
            <AppPreferences />
          </div>
        </div>

        <DangerZone />
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-24 md:bottom-10 right-6 md:right-10 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
        <DownloadCloud size={24} />
      </button>
    </DashboardLayout>
  );
}
