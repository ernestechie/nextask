import { client } from '@/lib/rpc';
import { ReactQueryKey } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export const useAppLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();

      if (!response.ok) throw new Error('Unexpected error occured');
      return await response.json();
    },
    onSuccess() {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [ReactQueryKey.current_user] });
      queryClient.invalidateQueries({ queryKey: [ReactQueryKey.workspaces] });
    },
    onError() {
      toast.error('Unexpected error occured');
    },
  });

  return logoutMutation;
};
