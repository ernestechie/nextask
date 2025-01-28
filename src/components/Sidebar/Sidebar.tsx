import Link from 'next/link';
import React from 'react';
import { DottedSeparator } from '../base/DottedSeparator';
import Navigation from './Navigation';

export default function Sidebar() {
  return (
    <aside className='h-full bg-gray-50 p-4 w-full'>
      <div className='p-4'>
        <Link href='/'>
          <p className='font-extrabold text-3xl text-center'>
            Nex<span className='text-blue-600'>Task</span>
          </p>
        </Link>
      </div>

      <DottedSeparator className='my-4' />
      <Navigation />
    </aside>
  );
}
