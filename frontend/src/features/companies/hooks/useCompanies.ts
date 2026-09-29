import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import companyService from '../services/companyService';

import type { Company } from '../types/company.types';

function useCompanies(): UseQueryResult<Company[], Error>;

function useCompanies(id: string): UseQueryResult<Company, Error>;

function useCompanies(
  id?: string,
): UseQueryResult<Company | Company[], Error> {
  return useQuery<Company | Company[], Error>({
    queryKey: id ? ['companies', id] : ['companies'],

    queryFn: async () => {
      if (id) {
        return companyService.getCompanyById(id);
      }

      return companyService.getCompanies();
    },

    retry: false,
  });
}

export default useCompanies;
