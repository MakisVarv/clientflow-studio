export type Company = {
  id: string;

  name: string;
  vat_number: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  industry: string | null;
  employees_count: number | null;

  country: string | null;
  city: string | null;
  address: string | null;
  postal_code: string | null;

  description: string | null;

  is_active: boolean;

  created_at: string;
  updated_at: string;
};

export type CreateCompanyRequest = {
  name: string;

  vat_number: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  industry: string | null;
  employees_count: number | null;

  country: string | null;
  city: string | null;
  address: string | null;
  postal_code: string | null;

  description: string | null;

};

export type UpdateCompanyRequest = CreateCompanyRequest & {
  is_active: boolean;
};
