import { client } from '@/lib/rpc';
import { ReactQueryKey } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.workspaces.$post>;
type RequestType = InferRequestType<typeof client.api.workspaces.$post>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces.$post({ form });

      if (!response.ok) throw new Error('Failed to create workspace');

      return await response.json();
    },
    onSuccess() {
      toast.success('Workspace created successfully');
      queryClient.invalidateQueries({ queryKey: [ReactQueryKey.workspaces] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
};
