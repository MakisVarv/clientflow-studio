export type DealStage =
  | 'NEW'
  | 'QUALIFICATION'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'CONTRACT'
  | 'WON'
  | 'LOST';

export type Deal = {
  id: string;

  lead_id: string;

  company_id: string;

  owner_id: string;

  title: string;

  value: string;

  stage: DealStage;

  probability: number;

  expected_close_date: string | null;

  closed_date: string | null;

  lost_reason: string | null;

  notes: string | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;
};

export type CreateDealRequest = {
  lead_id: string;

  company_id: string;

  owner_id: string;

  title: string;

  value: number;

  probability: number;

  expected_close_date: string | null;

  notes: string | null;
};

export type UpdateDealRequest = {
  title?: string;

  value?: number;

  stage?: DealStage;

  probability?: number;

  expected_close_date?: string | null;

  closed_date?: string | null;

  lost_reason?: string | null;

  notes?: string | null;

  is_active?: boolean;
};
