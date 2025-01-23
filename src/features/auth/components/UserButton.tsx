'use client';

import { Loader, LogOut } from 'lucide-react';
import React from 'react';

import { DottedSeparator } from '@/components/base/DottedSeparator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCurrentUser } from '../api/useCurrentUser';
import { useAppLogout } from '../api/useLogout';

export default function UserButton() {
  const { isLoading, data } = useCurrentUser();
  const { mutate: logout } = useAppLogout();

  if (isLoading)
    return (
      <div className='size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-200'>
        <Loader className='size-4 animate-spin text-muted-foreground' />
      </div>
    );

  if (!isLoading && !data?.user) return null;

  const { name, email } = data?.user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? 'U';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <Avatar className='size-10 hover:opacity-80 transition border border-e-neutral-300'>
          <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown Menu Content */}
      <DropdownMenuContent
        align='end'
        side='bottom'
        className='w-60'
        sideOffset={5}
      >
        <div className='flex flex-col items-center justify-center gap-2 px-3 py-4'>
          <Avatar className='size-14 transition border-e-neutral-300'>
            <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center'>
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          <div className='flex flex-col items-center justify-center'>
            <p className='font-semibold text-neutral-900 text-sm'>
              {name || 'User'}
            </p>
            <p className='text-xs text-neutral-600'>{email}</p>
          </div>
        </div>

        <DottedSeparator className='mb-1' />
        {/* Dropdown Menu Item */}
        <DropdownMenuItem
          className='h-10 flex items-center justify-center text-amber-700 cursor-pointer font-medium'
          onClick={() => logout()}
        >
          <LogOut className='size-4 mr-2' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
