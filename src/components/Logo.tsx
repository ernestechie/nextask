import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href='/'>
      <p className='font-extrabold text-3xl text-center'>
        Nex<span className='text-blue-600'>Task</span>
      </p>
    </Link>
  );
}
