export type Contact = {
  id: string;

  company_id: string;

  first_name: string;
  last_name: string;

  email: string | null;
  phone: string | null;
  mobile: string | null;

  position: string | null;
  department: string | null;

  is_primary: boolean;
  is_active: boolean;

  created_at: string;
  updated_at: string;
};

export type CreateContactRequest = {
  company_id: string;

  first_name: string;
  last_name: string;

  email: string | null;
  phone: string | null;
  mobile: string | null;

  position: string | null;
  department: string | null;

  is_primary: boolean;
};

export type UpdateContactRequest = {
  first_name: string;
  last_name: string;

  email: string | null;
  phone: string | null;
  mobile: string | null;

  position: string | null;
  department: string | null;

  is_primary: boolean;
  is_active: boolean;
};
