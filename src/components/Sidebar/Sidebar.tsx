import React from 'react';
import WorkspaceSwitcher from '../../features/workspaces/components/WorkspaceSwitcher';
import { DottedSeparator } from '../base/DottedSeparator';
import Logo from '../Logo';
import Navigation from './Navigation';

export default function Sidebar() {
  return (
    <aside className='h-full bg-gray-50 p-4 w-full'>
      <div className='p-4'>
        <Logo />
      </div>

      <DottedSeparator className='my-4' />
      <WorkspaceSwitcher />
      <DottedSeparator className='my-4' />
      <Navigation />
    </aside>
  );
}
