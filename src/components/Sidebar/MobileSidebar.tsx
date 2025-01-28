'use client';
import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Navigation from './Navigation';

export default function MobileSidebar() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const pathname = usePathname();

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
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
