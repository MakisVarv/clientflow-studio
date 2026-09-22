import { useMutation, useQueryClient } from '@tanstack/react-query';

import companyService from '../services/companyService';

function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.deleteCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      });
    },
  });
}

export default useDeleteCompany;
