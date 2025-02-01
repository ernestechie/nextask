import React from 'react';

export default function WorkspaceDetailsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  return (
    <div>
      <p className='font-bold'> Workspace {workspaceId}</p>
    </div>
  );
}
