import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import leadService from '../services/leadService';

import type { Lead } from '../types/lead.types';

function useLeads(): UseQueryResult<Lead[], Error>;

function useLeads(id: string): UseQueryResult<Lead, Error>;

function useLeads(id?: string): UseQueryResult<Lead | Lead[], Error> {
  return useQuery<Lead | Lead[], Error>({
    queryKey: id ? ['leads', id] : ['leads'],

    queryFn: async () => {
      if (id) {
        return leadService.getLeadById(id);
      }

      return leadService.getLeads();
    },

    retry: false,
  });
}

export default useLeads;
