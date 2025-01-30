import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export default function WorkspaceAvatar({
  image,
  name,
  className,
}: WorkspaceAvatarProps) {
  if (image) {
    return (
      <div className='size-8 relative rounded-md overflow-hidden'>
        <Image src={image} alt={name} fill className='object-cover' />
      </div>
    );
  }

  return (
    <Avatar className={cn('size-8 rounded-md', className)}>
      <AvatarFallback className='text-white bg-blue-600 font-bold text-lg uppercase rounded-md'>
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
