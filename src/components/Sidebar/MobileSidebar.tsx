'use client';
import { MenuIcon } from 'lucide-react';

import React, { useEffect } from 'react';
import WorkspaceSwitcher from '../../features/workspaces/components/WorkspaceSwitcher';
import { DottedSeparator } from '../base/DottedSeparator';
import Logo from '../Logo';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Navigation from './Navigation';

export default function MobileSidebar() {
  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    setModalOpen(false);
  }, []);

  return (
    <Sheet modal={false} open={modalOpen} onOpenChange={setModalOpen}>
      <SheetTrigger asChild>
        <Button size='icon' variant='secondary' className='lg:hidden '>
          <MenuIcon className='size-5 text-neutral-500' />
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className=''>
        <Logo />
        <DottedSeparator className='my-4' />
        <WorkspaceSwitcher />
        <DottedSeparator className='my-4' />
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
