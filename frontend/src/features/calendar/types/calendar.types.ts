export type CalendarEvent = {
  id: string;

  title: string;

  description: string | null;

  start_datetime: string;
  end_datetime: string;

  location: string | null;

  is_all_day: boolean;

  color: string;

  type: string;

  status: string;

  company_id: string | null;
  contact_id: string | null;
  lead_id: string | null;
  deal_id: string | null;

  owner_id: string;

  created_at: string;
  updated_at: string;
};

export type CreateCalendarEventRequest = {
  title: string;

  description: string | null;

  start_datetime: string;
  end_datetime: string;

  location: string | null;

  is_all_day: boolean;

  color: string;

  type: string;

  status: string;

  company_id: string | null;
  contact_id: string | null;
  lead_id: string | null;
  deal_id: string | null;

  owner_id: string;
};

export type UpdateCalendarEventRequest = {
  title?: string;

  description?: string | null;

  start_datetime?: string;
  end_datetime?: string;

  location?: string | null;

  is_all_day?: boolean;

  color?: string;

  type?: string;

  status?: string;
};
