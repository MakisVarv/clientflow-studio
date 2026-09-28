import api from '../../../api/axios';

import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest,
} from '../types/contact.types';

async function getContacts(): Promise<Contact[]> {
  const response = await api.get<Contact[]>('/contacts');

  return response.data;
}

async function getContactById(id: string): Promise<Contact> {
  const response = await api.get<Contact>(`/contacts/${id}`);

  return response.data;
}

async function createContact(
  data: CreateContactRequest,
): Promise<Contact> {
  const response = await api.post<Contact>('/contacts', data);

  return response.data;
}

async function updateContact(
  id: string,
  data: UpdateContactRequest,
): Promise<Contact> {
  const response = await api.put<Contact>(`/contacts/${id}`, data);

  return response.data;
}

async function deleteContact(id: string): Promise<void> {
  await api.delete(`/contacts/${id}`);
}

const contactService = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};

export default contactService;
