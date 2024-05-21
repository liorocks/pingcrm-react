import { Head } from '@inertiajs/react';
import MainMenu from '@/components/Menu/MainMenu';
import FlashMessages from '@/components/Messages/FlashMessages';
import TopHeader from '@/components/Header/TopHeader';
import BottomHeader from '@/components/Header/BottomHeader';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <TopHeader />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <MainMenu className="flex-shrink-0 hidden w-56 p-12 overflow-y-auto bg-indigo-800 md:block" />
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div
              className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12"
              scroll-region="true"
            >
              <FlashMessages />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
