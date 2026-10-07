import api from '../../../api/axios';

import type {
  Deal,
  CreateDealRequest,
  UpdateDealRequest,
} from '../types/deal.types';

async function getDeals(): Promise<Deal[]> {
  const response = await api.get<Deal[]>('/deals');

  return response.data;
}

async function getDealById(id: string): Promise<Deal> {
  const response = await api.get<Deal>(`/deals/${id}`);

  return response.data;
}

async function createDeal(data: CreateDealRequest): Promise<Deal> {
  const response = await api.post<Deal>('/deals', data);

  return response.data;
}

async function updateDeal(
  id: string,
  data: UpdateDealRequest,
): Promise<Deal> {
  const response = await api.put<Deal>(`/deals/${id}`, data);

  return response.data;
}

async function deleteDeal(id: string): Promise<void> {
  await api.delete(`/deals/${id}`);
}

const dealService = {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
};

export default dealService;
