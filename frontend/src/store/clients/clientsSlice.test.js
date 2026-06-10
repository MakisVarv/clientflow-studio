import { beforeEach, expect, test, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  addNote,
  createClient,
  deleteClient,
  deleteNote,
  getClients,
  resetClients,
  updateClient,
} from '../../services/clientApi';
import clientsReducer, {
  fetchClients,
  createClientThunk,
  deleteClientThunk,
  addNoteToClientThunk,
  deleteNoteFromClientThunk,
  resetDemoClientsThunk,
  updateClientThunk,
} from './clientsSlice';

vi.mock('../../services/clientApi', () => ({
  getClients: vi.fn(),
  createClient: vi.fn(),
  updateClient: vi.fn(),
  deleteClient: vi.fn(),
  addNote: vi.fn(),
  deleteNote: vi.fn(),
  resetClients: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

function createTestStore() {
  return configureStore({
    reducer: {
      clients: clientsReducer,
    },
  });
}

// Reusable test clients
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

test('fetchClients loads clients into Redux state', async () => {
  const fakeClients = [MARIA];
  // Mock the getClients API to return the fake clients
  getClients.mockResolvedValue(fakeClients);
  // Create a test store and dispatch the fetchClients thunk
  const store = createTestStore();
  // Wait for the thunk to complete and check the state
  await store.dispatch(fetchClients());
  // Get the updated state after the thunk has been dispatched
  const state = store.getState();
  // Verify that the clients were loaded into the state and that loading and error states are correct
  expect(state.clients.items).toEqual(fakeClients);
  expect(state.clients.isLoading).toBe(false);
  expect(state.clients.error).toBe('');
});

test('fetchClients handles error', async () => {
  getClients.mockRejectedValue(new Error());

  const store = createTestStore();

  await store.dispatch(fetchClients());

  const state = store.getState();

  expect(state.clients.items).toEqual([]);
  expect(state.clients.isLoading).toBe(false);
  expect(state.clients.error).toBe('Failed to load clients.');
});

test('createClientThunk adds a client when API succeeds', async () => {
  const newClient = MARIA;

  createClient.mockResolvedValue();

  const store = createTestStore();

  await store.dispatch(createClientThunk(newClient));

  const state = store.getState();

  expect(createClient).toHaveBeenCalledWith(newClient);
  expect(state.clients.items).toContainEqual(newClient);
  expect(state.clients.error).toBe('');
});
test('sets error when createClientThunk fails', async () => {
  const newClient = MARIA;

  createClient.mockRejectedValue(new Error('Create failed'));

  const store = createTestStore();

  await store.dispatch(createClientThunk(newClient));

  const state = store.getState();

  expect(state.clients.items).toEqual([]);
  expect(state.clients.error).toBe('Failed to create client.');
});
test('updateClientThunk updates an existing client when API succeeds', async () => {
  const existingClient = MARIA;

  const otherClient = NIKOS;

  const updatedClient = {
    ...existingClient,
    company: 'Aegean Digital Updated',
    status: 'inactive',
  };

  updateClient.mockResolvedValue(undefined);

  // Create a test store with the existing client in the state
  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [existingClient, otherClient],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(updateClientThunk(updatedClient));

  const state = store.getState();
  // Verify that the updateClient API was called with the updated client and that the state was updated correctly
  expect(updateClient).toHaveBeenCalledWith(updatedClient);
  expect(state.clients.items).toHaveLength(2);
  expect(state.clients.items[0]).toEqual(updatedClient);
  expect(state.clients.items[1]).toEqual(otherClient);
  expect(state.clients.error).toBe('');
});
test('sets error when updateClientThunk fails', async () => {
  const existingClient = MARIA;

  const updatedClient = {
    ...existingClient,
    company: 'Broken Update',
    status: 'inactive',
  };

  updateClient.mockRejectedValue(new Error('Update failed'));

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [existingClient],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(updateClientThunk(updatedClient));

  const state = store.getState();

  expect(state.clients.items[0]).toEqual(existingClient);
  expect(state.clients.error).toBe('Failed to update client.');
});
test('deleteClientThunk deletes a client when API succeeds', async () => {
  deleteClient.mockResolvedValue(undefined);

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [MARIA, NIKOS],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(deleteClientThunk('1'));

  const state = store.getState();

  expect(deleteClient).toHaveBeenCalledWith('1');
  expect(state.clients.items).toHaveLength(1);
  expect(state.clients.items[0]).toEqual(NIKOS);
  expect(state.clients.error).toBe('');
});
test('sets error when deleteClientThunk fails', async () => {
  deleteClient.mockRejectedValue(new Error('Delete failed'));

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [MARIA],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(deleteClientThunk('1'));

  const state = store.getState();

  expect(state.clients.items).toEqual([MARIA]);
  expect(state.clients.error).toBe('Failed to delete client.');
});

test('addNoteToClientThunk adds a note to the correct client', async () => {
  const note = {
    id: 'note-1',
    text: 'Follow up next week',
    createdAt: '2026-06-06T10:00:00.000Z',
  };

  addNote.mockResolvedValue(note);

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [MARIA, NIKOS],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    addNoteToClientThunk({
      clientId: '1',
      noteText: 'Follow up next week',
    }),
  );

  const state = store.getState();

  expect(addNote).toHaveBeenCalledWith('1', 'Follow up next week');
  expect(state.clients.items[0].notes).toHaveLength(1);
  expect(state.clients.items[0].notes[0]).toEqual(note);
  expect(state.clients.items[1].notes).toHaveLength(0);
  expect(state.clients.error).toBe('');
});

test('sets error when addNoteToClientThunk fails', async () => {
  addNote.mockRejectedValue(new Error('Add note failed'));

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [MARIA],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    addNoteToClientThunk({
      clientId: '1',
      noteText: 'Follow up next week',
    }),
  );

  const state = store.getState();

  expect(state.clients.items[0].notes).toHaveLength(0);
  expect(state.clients.error).toBe('Failed to add note to client.');
});

test('deleteNoteFromClientThunk deletes a note from the correct client', async () => {
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
    clientId: '1',
    noteId: 'note-1',
  });

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [maria, nikos],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    deleteNoteFromClientThunk({
      clientId: '1',
      noteId: 'note-1',
    }),
  );

  const state = store.getState();

  expect(deleteNote).toHaveBeenCalledWith('1', 'note-1');
  expect(state.clients.items[0].notes).toHaveLength(1);
  expect(state.clients.items[0].notes[0].id).toBe('note-2');

  expect(state.clients.items[1].notes).toHaveLength(1);
  expect(state.clients.items[1].notes[0].id).toBe('note-3');
  expect(state.clients.error).toBe('');
});

test('sets error when deleteNoteFromClientThunk fails', async () => {
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
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [maria],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(
    deleteNoteFromClientThunk({
      clientId: '1',
      noteId: 'note-1',
    }),
  );

  const state = store.getState();

  expect(state.clients.items[0].notes).toHaveLength(1);
  expect(state.clients.error).toBe('Failed to delete note.');
});

test('resetDemoClientsThunk replaces clients with demo data', async () => {
  const oldClient = {
    id: 'old-client',
    name: 'Old Client',
    company: 'Old Company',
    email: 'old@test.com',
    status: 'inactive',
    notes: [],
  };

  const demoClients = [MARIA];

  resetClients.mockResolvedValue(demoClients);

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [oldClient],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(resetDemoClientsThunk());

  const state = store.getState();

  expect(resetClients).toHaveBeenCalledTimes(1);
  expect(state.clients.items).toEqual(demoClients);
  expect(state.clients.isLoading).toBe(false);
  expect(state.clients.error).toBe('');
});

test('sets error when resetDemoClientsThunk fails', async () => {
  const oldClient = {
    id: 'old-client',
    name: 'Old Client',
    company: 'Old Company',
    email: 'old@test.com',
    status: 'inactive',
    notes: [],
  };

  resetClients.mockRejectedValue(new Error('Reset failed'));

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        items: [oldClient],
        isLoading: false,
        error: '',
      },
    },
  });

  await store.dispatch(resetDemoClientsThunk());

  const state = store.getState();

  expect(state.clients.items).toEqual([oldClient]);
  expect(state.clients.isLoading).toBe(false);
  expect(state.clients.error).toBe('Failed to reset clients.');
});
