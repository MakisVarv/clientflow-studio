import { useMutation, useQueryClient } from '@tanstack/react-query';

import contactService from '../services/contactService';

function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.createContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });
    },
  });
}

export default useCreateContact;
