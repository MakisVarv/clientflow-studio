import { useMutation, useQueryClient } from '@tanstack/react-query';

import leadService from '../services/leadService';

function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadService.createLead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['leads'],
      });
    },
  });
}

export default useCreateLead;
