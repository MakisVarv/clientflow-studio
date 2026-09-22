import { useQuery } from '@tanstack/react-query';

import companyService from '../services/companyService';

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],

    queryFn: companyService.getCompanies,
  });
}
export function useCompany(id: string) {
  return useQuery({
    queryKey: ['companies', id],

    queryFn: () => companyService.getCompanyById(id),

    enabled: !!id,
  });
}
