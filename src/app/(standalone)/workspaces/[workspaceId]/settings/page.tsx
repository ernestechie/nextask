import { getWorkspace } from '@/features/workspaces/actions';
import CreateWorkspaceForm from '@/features/workspaces/components/CreateWorkspaceForm';
import { NextaskWorkspace } from '@/features/workspaces/types';

import React from 'react';

interface WorkspaceDetailSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspaceDetailSettingsPage({
  params,
}: WorkspaceDetailSettingsPageProps) {
  const workspace = await getWorkspace(params.workspaceId);

  if (!workspace) return <p>No workspace</p>;

  return (
    <div className='w-full max-w-xl'>
      <p className='mb-4 font-bold'>{workspace.name}</p>

      <CreateWorkspaceForm
        initialValues={workspace as NextaskWorkspace}
        mode='UPDATE'
      />
    </div>
  );
}
