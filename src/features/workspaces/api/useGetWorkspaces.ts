import { client } from '@/lib/rpc';
import { ReactQueryKey } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: [ReactQueryKey.workspaces],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) throw new Error('Failed to fetch workspaces');

      const { data } = await response.json();

      return data;
    },
  });
};
