export type UserRole = {
  id: string;
  name: string;
  description?: string | null;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  role: UserRole | null;
};
