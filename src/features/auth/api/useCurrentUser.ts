import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) return null;

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
