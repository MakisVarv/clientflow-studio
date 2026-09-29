import { useMutation, useQueryClient } from '@tanstack/react-query';

import leadService from '../services/leadService';

import type { UpdateLeadRequest } from '../types/lead.types';

type UpdateLeadVariables = {
  id: string;
  data: UpdateLeadRequest;
};

function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateLeadVariables) =>
      leadService.updateLead(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['leads'],
      });

      queryClient.invalidateQueries({
        queryKey: ['leads', variables.id],
      });
    },
  });
}

export default useUpdateLead;
