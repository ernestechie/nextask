import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.auth)['sign-up']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.auth)['sign-up']['$post']
>;

export const useAppSignup = () => {
  const router = useRouter();
  const signupMutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth['sign-up']['$post']({ json });

      if (!response.ok) throw new Error('Failed to register account');

      return await response.json();
    },

    onSuccess() {
      toast.success('Welcome to NexTask!');
      router.push('/');
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return signupMutation;
};
