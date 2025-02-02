import Logo from '@/components/Logo';
import UserButton from '@/features/auth/components/UserButton';

import React from 'react';

interface StandaloneLayoutProps {
  children: React.ReactNode;
}

export default function StandaloneLayout({ children }: StandaloneLayoutProps) {
  return (
    <main className='bg-neutral-100 min-h-screen'>
      <div className='mx-auto max-w-screen-2xl p-4'>
        <nav className='flex justify-between items-center h-[72px]'>
          <Logo />
          <UserButton />
        </nav>
        <div className='flex flex-col w-full items-center justify-center py-4'>
          {children}
        </div>
      </div>
    </main>
  );
}
