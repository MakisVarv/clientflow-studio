export type Attachment = {
  id: string;

  original_name: string;
  stored_name: string;
  extension: string;
  mime_type: string;
  file_size: number;
  file_path: string;

  is_public: boolean;
  description: string | null;

  company_id: string | null;
  contact_id: string | null;
  lead_id: string | null;
  deal_id: string | null;

  owner_id: string;

  created_at: string;
  updated_at: string;
};

export type UploadAttachmentRequest = {
  file: File;

  description?: string;

  company_id?: string | null;
  contact_id?: string | null;
  lead_id?: string | null;
  deal_id?: string | null;

  owner_id: string;

  is_public?: boolean;
};
