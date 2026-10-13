import { useMutation, useQueryClient } from '@tanstack/react-query';

import activityService from '../services/activityService';

function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activityService.createActivity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });
}

export default useCreateActivity;
