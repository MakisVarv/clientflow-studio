import api from '../../../api/axios';

import type {
  Activity,
  CreateActivityRequest,
  UpdateActivityRequest,
} from '../types/activity.types';

async function getActivities(): Promise<Activity[]> {
  const response = await api.get<Activity[]>('/activities');

  return response.data;
}

async function getActivityById(id: string): Promise<Activity> {
  const response = await api.get<Activity>(`/activities/${id}`);

  return response.data;
}

async function createActivity(
  data: CreateActivityRequest,
): Promise<Activity> {
  const response = await api.post<Activity>('/activities', data);

  return response.data;
}

async function updateActivity(
  id: string,
  data: UpdateActivityRequest,
): Promise<Activity> {
  const response = await api.put<Activity>(`/activities/${id}`, data);

  return response.data;
}

async function deleteActivity(id: string): Promise<void> {
  await api.delete(`/activities/${id}`);
}

const activityService = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};

export default activityService;
