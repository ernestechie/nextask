import UserButton from '@/features/auth/components/UserButton';
import React from 'react';
import MobileSidebar from '../Sidebar/MobileSidebar';

export default function Navbar() {
  return (
    <nav className='pt-4 px-6 flex items-center justify-between'>
      <div className='hidden lg:flex flex-col'>
        <h1 className='text-2xl font-semibold'>Home</h1>
        <p className='text-muted-foreground'>
          Monitor all of your projects and tasks here.
        </p>
      </div>
      <div className='block lg:hidden'>
        <MobileSidebar />
      </div>
      <UserButton />
    </nav>
  );
}
