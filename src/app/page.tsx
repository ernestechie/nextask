import { getCurrentUser } from '@/features/auth/actions';
import UserButton from '@/features/auth/components/UserButton';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/sign-in');

  return (
    <main className='gap-4 p-8'>
      <h1 className='font-bold mb-8 text-2xl'>Jira Clone</h1>
      <UserButton />
    </main>
  );
}
