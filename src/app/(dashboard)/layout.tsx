import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen'>
      <div className='flex w-full h-full'>
        {/* Sidebar */}
        <div className='fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto'>
          <Sidebar />
        </div>

        <div className='lg:pl-[264px]'>
          {/* TODO - Navbar */}
          <div className='mx-auto max-w-screen-2xl h-full'>
            <main className='h-full py-8 px-6 flex flex-col gap-4'>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
