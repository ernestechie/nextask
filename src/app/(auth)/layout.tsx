'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();

  return (
    <main className='bg-neutral-100 min-h-screen'>
      <div className='mx-auto max-w-screen-xl p-4'>
        <nav className='flex justify-between items-center'>
          {/* Logo */}
          <Image
            src='/logo.svg'
            alt='Chat Fusion Logo'
            height={60}
            width={60}
          />

          {/* Navigation */}
          <Button asChild variant='secondary' size='large'>
            <Link href={pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>
              {pathname === '/sign-up' ? 'Sign In' : 'Sign Up'}
            </Link>
          </Button>
        </nav>

        <div className='flex flex-col items-center justify-center gap-2 pt-4 md:p-14'>
          {children}
        </div>
      </div>
    </main>
  );
}
