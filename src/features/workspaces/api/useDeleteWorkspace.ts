import { client } from '@/lib/rpc';
import { ReactQueryKey } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['$delete']
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['$delete']
>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[':workspaceId'].$delete({
        param,
      });

      if (!response.ok) throw new Error('Failed to delete workspace');

      return await response.json();
    },
    onSuccess() {
      toast.success('Workspace deleted successfully');
      queryClient.invalidateQueries({ queryKey: [ReactQueryKey.workspaces] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
};
