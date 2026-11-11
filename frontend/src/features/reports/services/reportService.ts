import api from '../../../api/axios';

import type {
  DashboardReport,
  SalesReport,
  LeadFunnelReport,
  TaskReport,
  FullReport,
} from '../types/report.types';

async function getDashboardReport(): Promise<DashboardReport> {
  const response = await api.get<{
    summary: DashboardReport;
  }>('/reports/dashboard');

  return response.data?.summary;
}

async function getSalesReport(): Promise<SalesReport> {
  const response = await api.get<{ summary: SalesReport }>(
    '/reports/sales',
  );

  return response.data?.summary;
}

async function getLeadFunnelReport(): Promise<LeadFunnelReport> {
  const response = await api.get<{
    statuses: Record<string, number>;
    total_leads: number;
  }>('/reports/lead-funnel');

  return {
    total_leads: response.data.total_leads,

    statuses: Object.entries(response.data.statuses).map(
      ([status, count]) => ({
        status,
        count,
      }),
    ),
  };
}

async function getTaskReport(): Promise<TaskReport> {
  const response = await api.get<{ tasks: TaskReport }>(
    '/reports/tasks',
  );

  return response.data?.tasks;
}

async function getFullReport(): Promise<FullReport> {
  const response = await api.get<FullReport>('/reports/full');

  return response.data;
}

const reportService = {
  getDashboardReport,
  getSalesReport,
  getLeadFunnelReport,
  getTaskReport,
  getFullReport,
};

export default reportService;
