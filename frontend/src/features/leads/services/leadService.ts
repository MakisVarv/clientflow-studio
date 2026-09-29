import api from '../../../api/axios';

import type {
  Lead,
  CreateLeadRequest,
  UpdateLeadRequest,
} from '../types/lead.types';

async function getLeads(): Promise<Lead[]> {
  const response = await api.get<Lead[]>('/leads');

  return response.data;
}

async function getLeadById(id: string): Promise<Lead> {
  const response = await api.get<Lead>(`/leads/${id}`);

  return response.data;
}

async function createLead(data: CreateLeadRequest): Promise<Lead> {
  const response = await api.post<Lead>('/leads', data);

  return response.data;
}

async function updateLead(
  id: string,
  data: UpdateLeadRequest,
): Promise<Lead> {
  const response = await api.put<Lead>(`/leads/${id}`, data);

  return response.data;
}

async function deleteLead(id: string): Promise<void> {
  await api.delete(`/leads/${id}`);
}

const leadService = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};

export default leadService;
