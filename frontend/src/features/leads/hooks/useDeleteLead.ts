import { useMutation, useQueryClient } from '@tanstack/react-query';

import leadService from '../services/leadService';

function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadService.deleteLead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['leads'],
      });
    },
  });
}

export default useDeleteLead;
