import { contacts } from '../data/contacts';
import { loadContacts, saveContacts } from './contactStorage';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getContacts() {
  await delay(300);
  return loadContacts();
}
export async function createContact(newContact) {
  await delay(300);

  const currentContacts = loadContacts();
  const updatedContacts = [...currentContacts, newContact];

  saveContacts(updatedContacts);

  return updatedContacts;
}
export async function updateContact(updatedContact) {
  await delay(300);

  const currentContacts = loadContacts();

  const updatedContacts = currentContacts.map((contact) =>
    contact.id === updatedContact.id ? updatedContact : contact,
  );

  saveContacts(updatedContacts);

  return updatedContacts;
}
export async function deleteContact(contactId) {
  await delay(300);

  const currentContacts = loadContacts();

  const updatedContacts = currentContacts.filter(
    (contact) => contact.id !== contactId,
  );

  saveContacts(updatedContacts);

  return updatedContacts;
}
export async function addNote(contactId, noteText) {
  await delay(300);

  const currentContacts = loadContacts();

  const note = {
    id: crypto.randomUUID(),
    text: noteText,
    createdAt: new Date().toISOString(),
  };

  const updatedContacts = currentContacts.map((contact) => {
    if (contact.id !== contactId) {
      return contact;
    }

    return {
      ...contact,
      notes: [...(contact.notes || []), note],
    };
  });

  saveContacts(updatedContacts);

  return note;
}
export async function deleteNote(contactId, noteId) {
  await delay(300);

  const currentContacts = loadContacts();

  const updatedContacts = currentContacts.map((contact) => {
    if (contact.id !== contactId) return contact;

    return {
      ...contact,
      notes: (contact.notes || []).filter(
        (note) => note.id !== noteId,
      ),
    };
  });

  saveContacts(updatedContacts);

  return { contactId, noteId };
}
export async function resetContacts() {
  await delay(300);

  saveContacts(contacts);

  return contacts;
}
