export type Note = {
  id: string;

  title: string;
  content: string;

  company_id: string | null;
  contact_id: string | null;
  lead_id: string | null;
  deal_id: string | null;

  owner_id: string;

  is_pinned: boolean;

  created_at: string;
  updated_at: string;
};

export type CreateNoteRequest = {
  title: string;
  content: string;

  company_id?: string | null;
  contact_id?: string | null;
  lead_id?: string | null;
  deal_id?: string | null;

  owner_id: string;
};

export type UpdateNoteRequest = {
  title?: string;
  content?: string;
};
