'use client';

import { useState } from 'react';
import { Sidebar, MobileNav } from '@facter/ds-core';
import { MainSidebar } from '@/components/layout/main-sidebar';
import { ResponsiveNavbar } from '@/components/layout/responsive-navbar';
import { CaptureBar } from '@/features/capture/components/capture-bar';
import { CaptureFab } from '@/features/capture/components/capture-fab';
import { SearchDialog } from '@/features/search/components/search-dialog';
import { MeetingBanner } from '@/features/meetings/components/meeting-banner';
import { mobileNavItems } from '@/config/navigation';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const mobileItems = mobileNavItems.map((item) => ({
    ...item,
    isActive: pathname.startsWith(item.href),
  }));

  return (
    <Sidebar.Root>
      <div className="min-h-screen bg-background">
        <MainSidebar />

        <Sidebar.Content>
          <ResponsiveNavbar onSearchClick={() => setSearchOpen(true)} />

          <main className="flex-1 p-4 pt-20 pb-20 md:pb-4 lg:p-6 lg:pt-20">
            <MeetingBanner />
            <CaptureBar />
            {children}
          </main>
        </Sidebar.Content>

        <CaptureFab />
        <MobileNav items={mobileItems} />
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </Sidebar.Root>
  );
}
