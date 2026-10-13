import { useMutation, useQueryClient } from '@tanstack/react-query';

import activityService from '../services/activityService';

import type { UpdateActivityRequest } from '../types/activity.types';

type UpdateActivityVariables = {
  id: string;
  data: UpdateActivityRequest;
};

function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateActivityVariables) =>
      activityService.updateActivity(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });

      queryClient.invalidateQueries({
        queryKey: ['activities', variables.id],
      });
    },
  });
}

export default useUpdateActivity;
