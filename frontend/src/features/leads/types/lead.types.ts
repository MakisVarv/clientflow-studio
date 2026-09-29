export type Lead = {
  id: string;

  company_id: string;
  contact_id: string;
  owner_id: string;

  title: string;

  description: string | null;

  source: string | null;
  status: string | null;
  priority: string | null;

  estimated_value: string | null;

  probability: number | null;

  expected_close_date: string | null;

  is_active: boolean;
};

export type CreateLeadRequest = {
  company_id: string;
  contact_id: string;
  owner_id: string;

  title: string;

  description: string | null;

  source: string | null;
  status: string | null;
  priority: string | null;

  estimated_value: number | null;

  probability: number | null;

  expected_close_date: string | null;

  is_active: boolean;
};

export type UpdateLeadRequest = {
  title?: string;

  description?: string | null;

  source?: string | null;
  status?: string | null;
  priority?: string | null;

  estimated_value?: number | null;

  probability?: number | null;

  expected_close_date?: string;

  is_active?: boolean;
};
