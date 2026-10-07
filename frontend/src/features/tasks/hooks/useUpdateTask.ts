import { useMutation, useQueryClient } from '@tanstack/react-query';

import taskService from '../services/taskService';

import type { UpdateTaskRequest } from '../types/task.types';

type UpdateTaskVariables = {
  id: string;
  data: UpdateTaskRequest;
};

function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTaskVariables) =>
      taskService.updateTask(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });

      queryClient.invalidateQueries({
        queryKey: ['tasks', variables.id],
      });
    },
  });
}

export default useUpdateTask;
