import { useMutation, useQueryClient } from '@tanstack/react-query';

import calendarService from '../services/calendarService';

function useDeleteCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarService.deleteCalendarEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['calendar'],
      });
    },
  });
}

export default useDeleteCalendarEvent;
