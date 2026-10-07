import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import taskService from '../services/taskService';

import type { Task } from '../types/task.types';

function useTasks(): UseQueryResult<Task[], Error>;

function useTasks(id: string): UseQueryResult<Task, Error>;

function useTasks(id?: string): UseQueryResult<Task[] | Task, Error> {
  return useQuery<Task[] | Task, Error>({
    queryKey: id ? ['tasks', id] : ['tasks'],

    queryFn: async () => {
      if (id) {
        return taskService.getTaskById(id);
      }

      return taskService.getTasks();
    },

    retry: false,
  });
}

export default useTasks;
