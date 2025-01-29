import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>;

export const useAppLogin = () => {
  const router = useRouter();
  const loginMutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login['$post']({ json });
      if (!response.ok) throw new Error('Failed to login');
      return await response.json();
    },

    onSuccess() {
      toast.success('Welcome to NexTask');
      router.push('/');
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return loginMutation;
};
