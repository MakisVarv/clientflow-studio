import { useMutation, useQueryClient } from '@tanstack/react-query';

import dealService from '../services/dealService';

import type { UpdateDealRequest } from '../types/deal.types';

type UpdateDealVariables = {
  id: string;
  data: UpdateDealRequest;
};

function useUpdateDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateDealVariables) =>
      dealService.updateDeal(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['deals'],
      });

      queryClient.invalidateQueries({
        queryKey: ['deals', variables.id],
      });
    },
  });
}

export default useUpdateDeal;
