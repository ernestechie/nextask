import { getWorkspaces } from '@/features/workspaces/actions';
import CreateWorkspaceForm from '@/features/workspaces/components/CreateWorkspaceForm';
import { NextaskWorkspace } from '@/features/workspaces/types';
import React from 'react';

export default async function WorkspaceDetailsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const workspaces = await getWorkspaces();

  if (!workspaces.documents || workspaces.total === 0)
    return <p>No workspaces</p>;

  return (
    <div>
      <CreateWorkspaceForm
        initialValues={workspaces.documents[0] as NextaskWorkspace}
        mode='UPDATE'
      />
    </div>
  );
}
