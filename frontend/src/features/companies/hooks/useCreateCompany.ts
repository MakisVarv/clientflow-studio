import { useMutation, useQueryClient } from '@tanstack/react-query';

import companyService from '../services/companyService';

function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.createCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      });
    },
  });
}

export default useCreateCompany;
