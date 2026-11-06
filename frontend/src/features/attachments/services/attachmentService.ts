import api from '../../../api/axios';

import type {
  Attachment,
  UploadAttachmentRequest,
} from '../types/attachment.types';

async function getAttachments(): Promise<Attachment[]> {
  const response = await api.get<Attachment[]>('/attachments');

  return response.data;
}

async function getAttachmentById(id: string): Promise<Attachment> {
  const response = await api.get<Attachment>(`/attachments/${id}`);

  return response.data;
}

async function uploadAttachment(
  data: UploadAttachmentRequest,
): Promise<Attachment> {
  const formData = new FormData();

  formData.append('file', data.file);

  formData.append('owner_id', data.owner_id);

  if (data.description) {
    formData.append('description', data.description);
  }

  if (data.company_id) {
    formData.append('company_id', data.company_id);
  }

  if (data.contact_id) {
    formData.append('contact_id', data.contact_id);
  }

  if (data.lead_id) {
    formData.append('lead_id', data.lead_id);
  }

  if (data.deal_id) {
    formData.append('deal_id', data.deal_id);
  }

  if (data.is_public !== undefined) {
    formData.append('is_public', String(data.is_public));
  }

  const response = await api.post<Attachment>(
    '/attachments/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}

async function deleteAttachment(id: string): Promise<void> {
  await api.delete(`/attachments/${id}`);
}

async function getCompanyAttachments(
  companyId: string,
): Promise<Attachment[]> {
  const response = await api.get<Attachment[]>(
    `/attachments/company/${companyId}`,
  );

  return response.data;
}

async function getContactAttachments(
  contactId: string,
): Promise<Attachment[]> {
  const response = await api.get<Attachment[]>(
    `/attachments/contact/${contactId}`,
  );

  return response.data;
}

async function getLeadAttachments(
  leadId: string,
): Promise<Attachment[]> {
  const response = await api.get<Attachment[]>(
    `/attachments/lead/${leadId}`,
  );

  return response.data;
}

async function getDealAttachments(
  dealId: string,
): Promise<Attachment[]> {
  const response = await api.get<Attachment[]>(
    `/attachments/deal/${dealId}`,
  );

  return response.data;
}

async function searchAttachments(
  query: string,
): Promise<Attachment[]> {
  const response = await api.get<Attachment[]>(
    '/attachments/search',
    {
      params: {
        q: query,
      },
    },
  );

  return response.data;
}

function getDownloadUrl(id: string) {
  return `${import.meta.env.VITE_API_URL}/attachments/download/${id}`;
}

function getPreviewUrl(id: string) {
  return `${import.meta.env.VITE_API_URL}/attachments/preview/${id}`;
}

const attachmentService = {
  getAttachments,

  getAttachmentById,

  uploadAttachment,

  deleteAttachment,

  getCompanyAttachments,

  getContactAttachments,

  getLeadAttachments,

  getDealAttachments,

  searchAttachments,

  getDownloadUrl,

  getPreviewUrl,
};

export default attachmentService;
