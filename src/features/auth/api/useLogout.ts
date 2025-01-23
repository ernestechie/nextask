import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export const useAppLogout = () => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      const data = await response.json();

      console.log('RESPONSE -> ', data);

      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });

  return logoutMutation;
};
