import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.auth)['sign-up']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.auth)['sign-up']['$post']
>;

export const useAppSignup = () => {
  const signupMutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth['sign-up']['$post']({ json });
      const data = await response.json();

      console.log('RESPONSE -> ', data);

      return data;
    },
  });

  return signupMutation;
};
