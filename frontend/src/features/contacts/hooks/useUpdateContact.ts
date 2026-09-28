import { useMutation, useQueryClient } from '@tanstack/react-query';

import contactService from '../services/contactService';

import type { UpdateContactRequest } from '../types/contact.types';

type UpdateContactVariables = {
  id: string;
  data: UpdateContactRequest;
};

function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateContactVariables) =>
      contactService.updateContact(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.id],
      });
    },
  });
}

export default useUpdateContact;
