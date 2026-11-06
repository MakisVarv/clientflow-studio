import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import attachmentService from '../services/attachmentService';

import type { UploadAttachmentRequest } from '../types/attachment.types';

export const attachmentKeys = {
  all: ['attachments'] as const,

  detail: (id: string) => ['attachments', id] as const,

  company: (companyId: string) =>
    ['attachments', 'company', companyId] as const,

  contact: (contactId: string) =>
    ['attachments', 'contact', contactId] as const,

  lead: (leadId: string) => ['attachments', 'lead', leadId] as const,

  deal: (dealId: string) => ['attachments', 'deal', dealId] as const,

  search: (query: string) =>
    ['attachments', 'search', query] as const,
};

export function useAttachments() {
  return useQuery({
    queryKey: attachmentKeys.all,
    queryFn: attachmentService.getAttachments,
  });
}

export function useAttachment(id: string) {
  return useQuery({
    queryKey: attachmentKeys.detail(id),

    queryFn: () => attachmentService.getAttachmentById(id),

    enabled: !!id,
  });
}

export function useCompanyAttachments(companyId: string) {
  return useQuery({
    queryKey: attachmentKeys.company(companyId),

    queryFn: () => attachmentService.getCompanyAttachments(companyId),

    enabled: !!companyId,
  });
}

export function useContactAttachments(contactId: string) {
  return useQuery({
    queryKey: attachmentKeys.contact(contactId),

    queryFn: () => attachmentService.getContactAttachments(contactId),

    enabled: !!contactId,
  });
}

export function useLeadAttachments(leadId: string) {
  return useQuery({
    queryKey: attachmentKeys.lead(leadId),

    queryFn: () => attachmentService.getLeadAttachments(leadId),

    enabled: !!leadId,
  });
}

export function useDealAttachments(dealId: string) {
  return useQuery({
    queryKey: attachmentKeys.deal(dealId),

    queryFn: () => attachmentService.getDealAttachments(dealId),

    enabled: !!dealId,
  });
}

export function useSearchAttachments(query: string) {
  return useQuery({
    queryKey: attachmentKeys.search(query),

    queryFn: () => attachmentService.searchAttachments(query),

    enabled: query.trim().length > 0,
  });
}

export function useUploadAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UploadAttachmentRequest) =>
      attachmentService.uploadAttachment(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attachmentKeys.all,
      });
    },
  });
}

export function useDeleteAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      attachmentService.deleteAttachment(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attachmentKeys.all,
      });
    },
  });
}
