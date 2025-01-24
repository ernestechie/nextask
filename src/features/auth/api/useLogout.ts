import { client } from '@/lib/rpc';
import { CurrentUser } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export const useAppLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      const data = await response.json();

      console.log('RESPONSE -> ', data);

      return data;
    },
    onSuccess() {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [CurrentUser.value] });
    },
  });

  return logoutMutation;
};
