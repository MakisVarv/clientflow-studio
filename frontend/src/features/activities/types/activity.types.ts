export type Activity = {
  id: string;

  company_id: string;
  contact_id: string | null;
  lead_id: string | null;
  deal_id: string | null;

  owner_id: string;

  type: string;

  subject: string;

  description: string | null;

  completed: boolean;

  created_at: string;
  updated_at: string;
};

export type CreateActivityRequest = {
  company_id: string;

  contact_id: string | null;
  lead_id: string | null;
  deal_id: string | null;

  owner_id: string;

  type: string;

  subject: string;

  description: string | null;
};

export type UpdateActivityRequest = {
  type?: string;

  subject?: string;

  description?: string | null;

  completed?: boolean;
};
