import api from '../../../api/axios';

import type {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from '../types/company.types';

async function getCompanies(): Promise<Company[]> {
  const response = await api.get<Company[]>('/companies');

  return response.data;
}

async function getCompanyById(id: string): Promise<Company> {
  const response = await api.get<Company>(`/companies/${id}`);

  return response.data;
}

async function createCompany(
  data: CreateCompanyRequest,
): Promise<Company> {
  const response = await api.post<Company>('/companies', data);

  return response.data;
}

async function updateCompany(
  id: string,
  data: UpdateCompanyRequest,
): Promise<Company> {
  const response = await api.put<Company>(`/companies/${id}`, data);

  return response.data;
}
async function deleteCompany(id: string): Promise<void> {
  await api.delete(`/companies/${id}`);
}

const companyService = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};

export default companyService;
