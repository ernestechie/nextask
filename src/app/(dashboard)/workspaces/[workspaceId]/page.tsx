import { getWorkspace } from '@/features/workspaces/actions';

import { redirect } from 'next/navigation';
import React from 'react';

export default async function WorkspaceDetailsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const workspace = await getWorkspace(workspaceId);

  if (!workspace) redirect('/');

  return (
    <div>
      <p>Workspace: {workspaceId}</p>
    </div>
  );
}
