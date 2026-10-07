import { useMutation, useQueryClient } from '@tanstack/react-query';

import taskService from '../services/taskService';

function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
}

export default useDeleteTask;
