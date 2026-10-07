import { useMutation, useQueryClient } from '@tanstack/react-query';

import dealService from '../services/dealService';

function useCreateDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealService.createDeal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deals'],
      });
    },
  });
}

export default useCreateDeal;
