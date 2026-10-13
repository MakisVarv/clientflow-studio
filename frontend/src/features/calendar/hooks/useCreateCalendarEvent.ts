import { useMutation, useQueryClient } from '@tanstack/react-query';

import calendarService from '../services/calendarService';

function useCreateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarService.createCalendarEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['calendar'],
      });
    },
  });
}

export default useCreateCalendarEvent;
