import { client } from '@/lib/rpc';
import { ReactQueryKey } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['$patch']
>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[':workspaceId'].$patch({
        form,
        param,
      });

      if (!response.ok) throw new Error('Failed to update workspace');

      return await response.json();
    },
    onSuccess({ data }) {
      toast.success(`${data?.workspace.name} updated successfully!`);
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.workspaces],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspace', data?.workspace.$id],
      });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
};
