import { useMutation, useQueryClient } from '@tanstack/react-query';

import activityService from '../services/activityService';

function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activityService.deleteActivity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });
}

export default useDeleteActivity;
