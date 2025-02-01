import { Loader } from 'lucide-react';
import React from 'react';

export default function DashboardLoading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Loader className='size-6 animate-spin text-muted-foreground' />
    </div>
  );
}
