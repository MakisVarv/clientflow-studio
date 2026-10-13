import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import activityService from '../services/activityService';

import type { Activity } from '../types/activity.types';

function useActivities(): UseQueryResult<Activity[], Error>;

function useActivities(id: string): UseQueryResult<Activity, Error>;

function useActivities(
  id?: string,
): UseQueryResult<Activity[] | Activity, Error> {
  return useQuery<Activity[] | Activity, Error>({
    queryKey: id ? ['activities', id] : ['activities'],

    queryFn: async () => {
      if (id) {
        return activityService.getActivityById(id);
      }

      return activityService.getActivities();
    },

    retry: false,
  });
}

export default useActivities;
