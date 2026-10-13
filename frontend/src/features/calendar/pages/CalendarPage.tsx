import { useNavigate } from 'react-router-dom';

import { Plus } from 'lucide-react';

import useCalendarEvents from '../hooks/useCalendarEvents';

import CalendarView from '../components/CalendarView';

function CalendarPage() {
  const navigate = useNavigate();

  const { data: events, isLoading, isError } = useCalendarEvents();

  if (isLoading) {
    return <div>Loading calendar...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-600">Failed to load calendar.</div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Calendar
          </h1>

          <p className="mt-2 text-slate-500">
            Manage meetings, appointments and CRM events.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/calendar/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <CalendarView events={events ?? []} />
    </div>
  );
}

export default CalendarPage;
