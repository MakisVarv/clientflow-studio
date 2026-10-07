import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import dealService from '../services/dealService';

import type { Deal } from '../types/deal.types';

function useDeals(): UseQueryResult<Deal[], Error>;

function useDeals(id: string): UseQueryResult<Deal, Error>;

function useDeals(id?: string): UseQueryResult<Deal[] | Deal, Error> {
  return useQuery<Deal[] | Deal, Error>({
    queryKey: id ? ['deals', id] : ['deals'],

    queryFn: async () => {
      if (id) {
        return dealService.getDealById(id);
      }

      return dealService.getDeals();
    },

    retry: false,
  });
}

export default useDeals;
