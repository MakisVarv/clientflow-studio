import { contacts } from '../data/contacts';

const STORAGE_KEY = 'clientflow_contacts';

export function loadContacts() {
  try {
    const savedContacts = localStorage.getItem(STORAGE_KEY);

    if (savedContacts) {
      return JSON.parse(savedContacts);
    }

    return contacts;
  } catch (error) {
    console.error('Failed to load contacts from storage:', error);
    return contacts;
  }
}

export function saveContacts(contactList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contactList));
}
