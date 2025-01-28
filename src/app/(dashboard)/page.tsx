import { getCurrentUser } from '@/features/auth/actions';
import CreateWorkspaceForm from '@/features/workspaces/components/CreateWorkspaceForm';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  console.log('Current User -> ', currentUser);

  // if (!currentUser) redirect('/sign-in');

  return (
    <section className='gap-4 p-4 bg-neutral-500s'>
      <CreateWorkspaceForm />
    </section>
  );
}
