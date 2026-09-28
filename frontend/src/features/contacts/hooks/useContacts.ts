import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import contactService from '../services/contactService';

import type { Contact } from '../types/contact.types';

function useContacts(): UseQueryResult<Contact[], Error>;

function useContacts(id: string): UseQueryResult<Contact, Error>;

function useContacts(
  id?: string,
): UseQueryResult<Contact | Contact[], Error> {
  return useQuery<Contact | Contact[], Error>({
    queryKey: id ? ['contacts', id] : ['contacts'],

    queryFn: async () => {
      if (id) {
        return contactService.getContactById(id);
      }

      return contactService.getContacts();
    },
  });
}

export default useContacts;
