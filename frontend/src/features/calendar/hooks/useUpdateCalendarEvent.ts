import { useMutation, useQueryClient } from '@tanstack/react-query';

import calendarService from '../services/calendarService';

import type { UpdateCalendarEventRequest } from '../types/calendar.types';

type Variables = {
  id: string;
  data: UpdateCalendarEventRequest;
};

function useUpdateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: Variables) =>
      calendarService.updateCalendarEvent(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['calendar'],
      });

      queryClient.invalidateQueries({
        queryKey: ['calendar', variables.id],
      });
    },
  });
}

export default useUpdateCalendarEvent;
