import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import calendarService from '../services/calendarService';

import type { CalendarEvent } from '../types/calendar.types';

function useCalendarEvents(): UseQueryResult<CalendarEvent[], Error>;

function useCalendarEvents(
  id: string,
): UseQueryResult<CalendarEvent, Error>;

function useCalendarEvents(
  id?: string,
): UseQueryResult<CalendarEvent[] | CalendarEvent, Error> {
  return useQuery<CalendarEvent[] | CalendarEvent, Error>({
    queryKey: id ? ['calendar', id] : ['calendar'],

    queryFn: async () => {
      if (id) {
        return calendarService.getCalendarEventById(id);
      }

      return calendarService.getCalendarEvents();
    },

    retry: false,
  });
}

export default useCalendarEvents;
