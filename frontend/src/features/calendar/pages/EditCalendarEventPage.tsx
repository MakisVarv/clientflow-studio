import { useNavigate, useParams } from 'react-router-dom';

import CalendarEventForm, {
  type CalendarEventFormData,
} from '../components/CalendarEventForm';

import useCalendarEvents from '../hooks/useCalendarEvents';

import useUpdateCalendarEvent from '../hooks/useUpdateCalendarEvent';

import type { UpdateCalendarEventRequest } from '../types/calendar.types';

function toDateTimeLocal(value: string) {
  const date = new Date(value);

  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

function EditCalendarEventPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: event,
    isLoading,
    isError,
  } = useCalendarEvents(id ?? '');

  const updateEvent = useUpdateCalendarEvent();

  if (isLoading) {
    return <div>Loading event...</div>;
  }

  if (isError || !event || !id) {
    return <div className="text-red-600">Failed to load event.</div>;
  }

  const initialValues: CalendarEventFormData = {
    title: event.title,

    description: event.description ?? '',

    start_datetime: toDateTimeLocal(event.start_datetime),

    end_datetime: toDateTimeLocal(event.end_datetime),

    location: event.location ?? '',

    is_all_day: event.is_all_day,

    color: event.color,

    type: event.type,

    status: event.status,

    company_id: event.company_id ?? '',

    contact_id: event.contact_id ?? '',

    lead_id: event.lead_id ?? '',

    deal_id: event.deal_id ?? '',

    owner_id: event.owner_id,
  };

  function handleSubmit(data: CalendarEventFormData) {
    const payload: UpdateCalendarEventRequest = {
      title: data.title,

      description: data.description || null,

      start_datetime: new Date(data.start_datetime).toISOString(),

      end_datetime: new Date(data.end_datetime).toISOString(),

      location: data.location || null,

      is_all_day: data.is_all_day,

      color: data.color,

      type: data.type,

      status: data.status,
    };

    updateEvent.mutate(
      {
        id,
        data: payload,
      },
      {
        onSuccess: () => navigate('/calendar'),
      },
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        Edit Calendar Event
      </h1>

      <CalendarEventForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/calendar')}
        isPending={updateEvent.isPending}
        disableRelations
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditCalendarEventPage;
