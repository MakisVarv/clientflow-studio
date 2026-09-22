import { useMutation, useQueryClient } from '@tanstack/react-query';

import companyService from '../services/companyService';

import type { UpdateCompanyRequest } from '../types/company.types';

type UpdateCompanyVariables = {
  id: string;
  data: UpdateCompanyRequest;
};

function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCompanyVariables) =>
      companyService.updateCompany(id, data),

    onSuccess: (company) => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      });

      queryClient.invalidateQueries({
        queryKey: ['companies', company.id],
      });
    },
  });
}

export default useUpdateCompany;
