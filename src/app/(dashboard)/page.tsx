import { getCurrentUser } from '@/features/auth/actions';
import { getWorkspaces } from '@/features/workspaces/actions';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/sign-in');

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    redirect(`/workspaces/create`);
  } else {
    redirect(
      `/workspaces/${workspaces?.documents && workspaces.documents[0]?.$id}`
    );
  }
}
