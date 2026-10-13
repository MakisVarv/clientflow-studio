import api from '../../../api/axios';

import type {
  CalendarEvent,
  CreateCalendarEventRequest,
  UpdateCalendarEventRequest,
} from '../types/calendar.types';

async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const response = await api.get<CalendarEvent[]>('/calendar');

  return response.data;
}

async function getCalendarEventById(
  id: string,
): Promise<CalendarEvent> {
  const response = await api.get<CalendarEvent>(`/calendar/${id}`);

  return response.data;
}

async function createCalendarEvent(
  data: CreateCalendarEventRequest,
): Promise<CalendarEvent> {
  const response = await api.post<CalendarEvent>('/calendar', data);

  return response.data;
}

async function updateCalendarEvent(
  id: string,
  data: UpdateCalendarEventRequest,
): Promise<CalendarEvent> {
  const response = await api.put<CalendarEvent>(
    `/calendar/${id}`,
    data,
  );

  return response.data;
}

async function deleteCalendarEvent(id: string): Promise<void> {
  await api.delete(`/calendar/${id}`);
}

export default {
  getCalendarEvents,
  getCalendarEventById,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};
