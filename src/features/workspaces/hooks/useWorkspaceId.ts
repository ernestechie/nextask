import { useParams } from 'next/navigation';

export default function useWorkspaceId() {
  const params = useParams();
  return params.workspaceId as string;
}
