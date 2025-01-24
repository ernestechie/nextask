import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DottedSeparator } from '../base/DottedSeparator';
import Navigation from './Navigation';

export default function Sidebar() {
  return (
    <aside className='h-full bg-gray-50 p-4 w-full'>
      <Link href='/'>
        <Image src='/logo.svg' alt='Nextask Logo' width={64} height={48} />
      </Link>
      <DottedSeparator className='my-4' />
      <Navigation />
    </aside>
  );
}
