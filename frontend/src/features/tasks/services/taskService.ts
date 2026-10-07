import api from '../../../api/axios';

import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '../types/task.types';

async function getTasks(): Promise<Task[]> {
  const response = await api.get<Task[]>('/tasks');

  return response.data;
}

async function getTaskById(id: string): Promise<Task> {
  const response = await api.get<Task>(`/tasks/${id}`);

  return response.data;
}

async function createTask(data: CreateTaskRequest): Promise<Task> {
  const response = await api.post<Task>('/tasks', data);

  return response.data;
}

async function updateTask(
  id: string,
  data: UpdateTaskRequest,
): Promise<Task> {
  const response = await api.put<Task>(`/tasks/${id}`, data);

  return response.data;
}

async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

const taskService = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
