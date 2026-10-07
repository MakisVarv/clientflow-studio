import { useMutation, useQueryClient } from '@tanstack/react-query';

import dealService from '../services/dealService';

function useDeleteDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealService.deleteDeal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deals'],
      });
    },
  });
}

export default useDeleteDeal;
