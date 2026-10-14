import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';

import themePlugin from '@fullcalendar/react/themes/classic';

// FullCalendar v7 CSS
import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/classic/theme.css';
import '@fullcalendar/react/themes/classic/palette.css';

import { useNavigate } from 'react-router-dom';

import type { CalendarEvent } from '../types/calendar.types';

import useUpdateCalendarEvent from '../hooks/useUpdateCalendarEvent';

type Props = {
  events: CalendarEvent[];
};

function CalendarView({ events }: Props) {
  const navigate = useNavigate();

  const updateEvent = useUpdateCalendarEvent();

  /*
   * Μετατροπή των events του backend
   * στη μορφή που περιμένει το FullCalendar
   */

  const calendarEvents = events.map((event) => ({
    id: event.id,

    title: event.title,

    start: event.start_datetime,

    end: event.end_datetime,

    allDay: event.is_all_day,

    color: event.color,

    contrastColor: '#ffffff',
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <FullCalendar
        /*
         * PLUGINS
         */

        plugins={[
          themePlugin,
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        /*
         * Αρχική προβολή
         */

        initialView="dayGridMonth"
        /*
         * Toolbar
         */

        headerToolbar={{
          left: 'prev,next today',

          center: 'title',

          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        /*
         * Events
         */

        events={calendarEvents}
        /*
         * DRAG & DROP
         */

        editable={true}
        eventStartEditable={true}
        eventDurationEditable={true}
        /*
         * Μετακίνηση Event
         */

        eventDrop={(info) => {
          const start = info.event.start;

          const end = info.event.end;

          if (!start) {
            info.revert();

            return;
          }

          updateEvent.mutate(
            {
              id: info.event.id,

              data: {
                start_datetime: start.toISOString(),

                end_datetime: end
                  ? end.toISOString()
                  : start.toISOString(),

                is_all_day: info.event.allDay,
              },
            },

            {
              /*
               * Αν αποτύχει το backend,
               * επιστρέφει το event
               * στην προηγούμενη θέση.
               */

              onError: () => {
                info.revert();
              },
            },
          );
        }}
        /*
         * RESIZE EVENT
         *
         * Στο Week / Day view
         * μπορούμε να αλλάξουμε
         * τη διάρκεια.
         */

        eventResize={(info) => {
          const start = info.event.start;

          const end = info.event.end;

          if (!start || !end) {
            info.revert();

            return;
          }

          updateEvent.mutate(
            {
              id: info.event.id,

              data: {
                start_datetime: start.toISOString(),

                end_datetime: end.toISOString(),
              },
            },

            {
              onError: () => {
                info.revert();
              },
            },
          );
        }}
        /*
         * CLICK EVENT
         *
         * Πηγαίνει στο Edit
         */

        eventClick={(info) => {
          navigate(`/calendar/${info.event.id}/edit`);
        }}
        /*
         * Εμφάνιση ώρας στα events
         */

        displayEventTime={true}
        /*
         * Format ώρας
         */

        eventTimeFormat={{
          hour: '2-digit',

          minute: '2-digit',

          hour12: false,
        }}
        /*
         * Ύψος Calendar
         */

        height="auto"
      />
    </div>
  );
}

export default CalendarView;
