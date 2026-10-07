import { useMutation, useQueryClient } from '@tanstack/react-query';

import taskService from '../services/taskService';

function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
}

export default useCreateTask;
