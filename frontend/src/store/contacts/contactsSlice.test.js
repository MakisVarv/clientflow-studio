import { beforeEach, expect, test, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  addNote,
  createContact,
  deleteContact,
  deleteNote,
  getContacts,
  resetContacts,
  updateContact,
} from '../../services/contactApi';
import contactsReducer, {
  fetchContacts,
  createContactThunk,
  deleteContactThunk,
  addNoteToContactThunk,
  deleteNoteFromContactThunk,
  resetDemoContactsThunk,
  updateContactThunk,
} from './contactsSlice';

vi.mock('../../services/contactApi', () => ({
  getContacts: vi.fn(),
  createContact: vi.fn(),
  updateContact: vi.fn(),
  deleteContact: vi.fn(),
  addNote: vi.fn(),
  deleteNote: vi.fn(),
  resetContacts: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

function createTestStore() {
  return configureStore({
    reducer: {
      contacts: contactsReducer,
    },
  });
}

// Reusable test contacts
const MARIA = {
  id: '1',
  name: 'Maria',
  company: 'Aegean Digital',
  email: 'maria@test.com',
  status: 'active',
  notes: [],
};

const NIKOS = {
  id: '2',
  name: 'Nikos',
  company: 'Helios Consulting',
  email: 'nikos@test.com',
  status: 'lead',
  notes: [],
};

test('fetchContacts loads contacts into Redux state', async () => {
  const fakeContacts = [MARIA];
  // Mock the getContacts API to return the fake contacts
  getContacts.mockResolvedValue(fakeContacts);
  // Create a test store and dispatch the fetchContacts thunk
  const store = createTestStore();
  // Wait for the thunk to complete and check the state
  await store.dispatch(fetchContacts());
  // Get the updated state after the thunk has been dispatched
  const state = store.getState();
  // Verify that the contacts were loaded into the state and that loading and error states are correct
  expect(state.contacts.items).toEqual(fakeContacts);
  expect(state.contacts.isLoading).toBe(false);
  expect(state.contacts.error).toBe('');
});

test('fetchContacts handles error', async () => {
  getContacts.mockRejectedValue(new Error());

  const store = createTestStore();

  await store.dispatch(fetchContacts());

  const state = store.getState();

  expect(state.contacts.items).toEqual([]);
  expect(state.contacts.isLoading).toBe(false);
  expect(state.contacts.error).toBe('Failed to load contacts.');
});

test('createContactThunk adds a contact when API succeeds', async () => {
  const newContact = MARIA;

  createContact.mockResolvedValue();

  const store = createTestStore();

  await store.dispatch(createContactThunk(newContact));

  const state = store.getState();

  expect(createContact).toHaveBeenCalledWith(newContact);
  expect(state.contacts.items).toContainEqual(newContact);
  expect(state.contacts.error).toBe('');
});
test('sets error when createContactThunk fails', async () => {
  const newContact = MARIA;

  createContact.mockRejectedValue(new Error('Create failed'));

  const store = createTestStore();

  await store.dispatch(createContactThunk(newContact));

  const state = store.getState();

  expect(state.contacts.items).toEqual([]);
  expect(state.contacts.error).toBe('Failed to create contact.');
});
test('updateContactThunk updates an existing contact when API succeeds', async () => {
  const existingContact = MARIA;

  const otherContact = NIKOS;

  const updatedContact = {
    ...existingContact,
    company: 'Aegean Digital Updated',
    status: 'inactive',
  };

  updateContact.mockResolvedValue(undefined);

  // Create a test store with the existing contact in the state
  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [existingContact, otherContact],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(updateContactThunk(updatedContact));

  const state = store.getState();
  // Verify that the updateContact API was called with the updated contact and that the state was updated correctly
  expect(updateContact).toHaveBeenCalledWith(updatedContact);
  expect(state.contacts.items).toHaveLength(2);
  expect(state.contacts.items[0]).toEqual(updatedContact);
  expect(state.contacts.items[1]).toEqual(otherContact);
  expect(state.contacts.error).toBe('');
});
test('sets error when updateContactThunk fails', async () => {
  const existingContact = MARIA;

  const updatedContact = {
    ...existingContact,
    company: 'Broken Update',
    status: 'inactive',
  };

  updateContact.mockRejectedValue(new Error('Update failed'));

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [existingContact],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(updateContactThunk(updatedContact));

  const state = store.getState();

  expect(state.contacts.items[0]).toEqual(existingContact);
  expect(state.contacts.error).toBe('Failed to update contact.');
});
test('deleteContactThunk deletes a contact when API succeeds', async () => {
  deleteContact.mockResolvedValue(undefined);

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [MARIA, NIKOS],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(deleteContactThunk('1'));

  const state = store.getState();

  expect(deleteContact).toHaveBeenCalledWith('1');
  expect(state.contacts.items).toHaveLength(1);
  expect(state.contacts.items[0]).toEqual(NIKOS);
  expect(state.contacts.error).toBe('');
});
test('sets error when deleteContactThunk fails', async () => {
  deleteContact.mockRejectedValue(new Error('Delete failed'));

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [MARIA],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(deleteContactThunk('1'));

  const state = store.getState();

  expect(state.contacts.items).toEqual([MARIA]);
  expect(state.contacts.error).toBe('Failed to delete contact.');
});

test('addNoteToContactThunk adds a note to the correct contact', async () => {
  const note = {
    id: 'note-1',
    text: 'Follow up next week',
    createdAt: '2026-06-06T10:00:00.000Z',
  };

  addNote.mockResolvedValue(note);

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [MARIA, NIKOS],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    addNoteToContactThunk({
      contactId: '1',
      noteText: 'Follow up next week',
    }),
  );

  const state = store.getState();

  expect(addNote).toHaveBeenCalledWith('1', 'Follow up next week');
  expect(state.contacts.items[0].notes).toHaveLength(1);
  expect(state.contacts.items[0].notes[0]).toEqual(note);
  expect(state.contacts.items[1].notes).toHaveLength(0);
  expect(state.contacts.error).toBe('');
});

test('sets error when addNoteToContactThunk fails', async () => {
  addNote.mockRejectedValue(new Error('Add note failed'));

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [MARIA],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    addNoteToContactThunk({
      contactId: '1',
      noteText: 'Follow up next week',
    }),
  );

  const state = store.getState();

  expect(state.contacts.items[0].notes).toHaveLength(0);
  expect(state.contacts.error).toBe('Failed to add note to contact.');
});

test('deleteNoteFromContactThunk deletes a note from the correct contact', async () => {
  const maria = {
    ...MARIA,
    notes: [
      {
        id: 'note-1',
        text: 'Follow up next week',
        createdAt: '2026-06-06T10:00:00.000Z',
      },
      {
        id: 'note-2',
        text: 'Send proposal',
        createdAt: '2026-06-06T11:00:00.000Z',
      },
    ],
  };

  const nikos = {
    ...NIKOS,
    notes: [
      {
        id: 'note-3',
        text: 'Call Friday',
        createdAt: '2026-06-06T12:00:00.000Z',
      },
    ],
  };

  deleteNote.mockResolvedValue({
    contactId: '1',
    noteId: 'note-1',
  });

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [maria, nikos],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    deleteNoteFromContactThunk({
      contactId: '1',
      noteId: 'note-1',
    }),
  );

  const state = store.getState();

  expect(deleteNote).toHaveBeenCalledWith('1', 'note-1');
  expect(state.contacts.items[0].notes).toHaveLength(1);
  expect(state.contacts.items[0].notes[0].id).toBe('note-2');

  expect(state.contacts.items[1].notes).toHaveLength(1);
  expect(state.contacts.items[1].notes[0].id).toBe('note-3');
  expect(state.contacts.error).toBe('');
});

test('sets error when deleteNoteFromContactThunk fails', async () => {
  const maria = {
    ...MARIA,
    notes: [
      {
        id: 'note-1',
        text: 'Follow up next week',
        createdAt: '2026-06-06T10:00:00.000Z',
      },
    ],
  };

  deleteNote.mockRejectedValue(new Error('Delete note failed'));

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [maria],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    deleteNoteFromContactThunk({
      contactId: '1',
      noteId: 'note-1',
    }),
  );

  const state = store.getState();

  expect(state.contacts.items[0].notes).toHaveLength(1);
  expect(state.contacts.error).toBe('Failed to delete note.');
});

test('resetDemoContactsThunk replaces contacts with demo data', async () => {
  const oldContact = {
    id: 'old-contact',
    name: 'Old Contact',
    company: 'Old Company',
    email: 'old@test.com',
    status: 'inactive',
    notes: [],
  };

  const demoContacts = [MARIA];

  resetContacts.mockResolvedValue(demoContacts);

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [oldContact],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(resetDemoContactsThunk());

  const state = store.getState();

  expect(resetContacts).toHaveBeenCalledTimes(1);
  expect(state.contacts.items).toEqual(demoContacts);
  expect(state.contacts.isLoading).toBe(false);
  expect(state.contacts.error).toBe('');
});

test('sets error when resetDemoContactsThunk fails', async () => {
  const oldContact = {
    id: 'old-contact',
    name: 'Old Contact',
    company: 'Old Company',
    email: 'old@test.com',
    status: 'inactive',
    notes: [],
  };

  resetContacts.mockRejectedValue(new Error('Reset failed'));

  const store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    preloadedState: {
      contacts: {
        items: [oldContact],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(resetDemoContactsThunk());

  const state = store.getState();

  expect(state.contacts.items).toEqual([oldContact]);
  expect(state.contacts.isLoading).toBe(false);
  expect(state.contacts.error).toBe('Failed to reset contacts.');
});
