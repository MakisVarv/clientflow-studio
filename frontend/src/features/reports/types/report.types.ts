export type DashboardReport = {
  companies: number;
  contacts: number;
  leads: number;
  deals: number;
  tasks: number;
  activities: number;
  calendar_events: number;
  users: number;
};

export type SalesReport = {
  total_sales: number;
  average_sale: number;

  won_deals: number;
  lost_deals: number;
  open_deals: number;

  conversion_rate: number;
};

export type LeadFunnelItem = {
  status: string;
  count: number;
};

export type LeadFunnelReport = {
  statuses: LeadFunnelItem[];
  total_leads: number;
};

export type TaskReport = {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
};

export type FullReport = {
  dashboard: DashboardReport;
  sales: SalesReport;
  lead_funnel: LeadFunnelReport;
  tasks: TaskReport;
};
