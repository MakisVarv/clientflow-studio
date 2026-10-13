import { useNavigate } from 'react-router-dom';

import CalendarEventForm, {
  type CalendarEventFormData,
} from '../components/CalendarEventForm';

import useCreateCalendarEvent from '../hooks/useCreateCalendarEvent';

import type { CreateCalendarEventRequest } from '../types/calendar.types';

function CreateCalendarEventPage() {
  const navigate = useNavigate();

  const createEvent = useCreateCalendarEvent();

  function handleSubmit(data: CalendarEventFormData) {
    const payload: CreateCalendarEventRequest = {
      title: data.title,

      description: data.description || null,

      start_datetime: new Date(data.start_datetime).toISOString(),

      end_datetime: new Date(data.end_datetime).toISOString(),

      location: data.location || null,

      is_all_day: data.is_all_day,

      color: data.color,

      type: data.type,

      status: data.status,

      company_id: data.company_id || null,

      contact_id: data.contact_id || null,

      lead_id: data.lead_id || null,

      deal_id: data.deal_id || null,

      owner_id: data.owner_id,
    };

    createEvent.mutate(payload, {
      onSuccess: () => navigate('/calendar'),
    });
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        Add Calendar Event
      </h1>

      <CalendarEventForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/calendar')}
        isPending={createEvent.isPending}
        submitLabel="Save Event"
      />
    </div>
  );
}

export default CreateCalendarEventPage;
