import { useQuery } from '@tanstack/react-query';

import reportService from '../services/reportService';

export const reportKeys = {
  dashboard: ['reports', 'dashboard'] as const,

  sales: ['reports', 'sales'] as const,

  leadFunnel: ['reports', 'lead-funnel'] as const,

  tasks: ['reports', 'tasks'] as const,

  full: ['reports', 'full'] as const,
};

export function useDashboardReport() {
  return useQuery({
    queryKey: reportKeys.dashboard,

    queryFn: reportService.getDashboardReport,
  });
}

export function useSalesReport() {
  return useQuery({
    queryKey: reportKeys.sales,

    queryFn: reportService.getSalesReport,
  });
}

export function useLeadFunnelReport() {
  return useQuery({
    queryKey: reportKeys.leadFunnel,

    queryFn: reportService.getLeadFunnelReport,
  });
}

export function useTaskReport() {
  return useQuery({
    queryKey: reportKeys.tasks,

    queryFn: reportService.getTaskReport,
  });
}

export function useFullReport() {
  return useQuery({
    queryKey: reportKeys.full,

    queryFn: reportService.getFullReport,
  });
}
