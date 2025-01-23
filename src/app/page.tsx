'use client';
import { useCurrentUser } from '@/features/auth/api/useCurrentUser';

export default function HomePage() {
  const { isPending, data } = useCurrentUser();

  return (
    <main className='gap-4 p-8'>
      <h1 className='font-bold mb-8 text-2xl'>Jira Clone</h1>

      <div className='p-8 bg-gray-100 rounded-xl text-xl'>
        {!isPending && <p>{data?.user.email}</p>}
        {isPending && <p>Loading...</p>}
        {!isPending && !data && <p>Unauthorized</p>}
      </div>
    </main>
  );
}
