export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type Task = {
  id: string;

  company_id: string;

  contact_id: string | null;

  lead_id: string | null;

  deal_id: string | null;

  owner_id: string;

  title: string;

  description: string | null;

  due_date: string | null;

  completed_at: string | null;

  status: TaskStatus;

  priority: TaskPriority;

  completed: boolean;

  created_at: string;

  updated_at: string;
};

export type CreateTaskRequest = {
  company_id: string;

  contact_id: string | null;

  lead_id: string | null;

  deal_id: string | null;

  owner_id: string;

  title: string;

  description: string | null;

  due_date: string | null;

  priority: TaskPriority;
};

export type UpdateTaskRequest = {
  deal_id?: string | null;
  title?: string;

  description?: string | null;

  due_date?: string | null;

  completed_at?: string | null;

  status?: TaskStatus;

  priority?: TaskPriority;

  completed?: boolean;
};
