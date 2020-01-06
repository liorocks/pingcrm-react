import React from 'react';
import Helmet from 'react-helmet';
import MainMenu from '@/Shared/MainMenu';
import FlashMessages from '@/Shared/FlashMessages';
import TopHeader from '@/Shared/TopHeader';
import BottomHeader from '@/Shared/BottomHeader';

export default function Layout({ children }) {
  return (
    <div>
      <Helmet titleTemplate="%s | Ping CRM" />
      <div className="flex flex-col">
        <div className="h-screen flex flex-col">
          <div className="md:flex">
            <TopHeader />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <MainMenu className="bg-indigo-800 flex-shrink-0 w-56 p-12 hidden md:block overflow-y-auto" />
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="w-full overflow-hidden px-4 py-8 md:p-12 overflow-y-auto">
              <FlashMessages />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
