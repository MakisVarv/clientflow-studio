import { expect, test } from 'vitest';
import clientsReducer, {
  clientAdded,
  clientDeleted,
  clientsReset,
  clientUpdated,
  noteAdded,
  noteDeleted,
} from './clientsSlice';

test('adds a client', () => {
  const previousState = {
    items: [
      {
        id: '1',
        name: 'Maria',
        company: 'Aegean Digital',
        email: 'maria@test.com',
        status: 'active',
        notes: [],
      },
    ],
    isLoading: false,
    error: '',
  };

  const newClient = {
    id: '2',
    name: 'Nikos',
    company: 'Helios Consulting',
    email: 'nikos@test.com',
    status: 'lead',
    notes: [],
  };

  const nextState = clientsReducer(
    previousState,
    clientAdded(newClient),
  );

  expect(nextState.items).toHaveLength(2);
  expect(nextState.items[1]).toEqual(newClient);
});
test('updates an existing client', () => {
  const previousState = {
    items: [
      {
        id: '1',
        name: 'Maria',
        company: 'Aegean Digital',
        email: 'maria@test.com',
        status: 'active',
        notes: [],
      },
      {
        id: '2',
        name: 'Nikos',
        company: 'Helios Consulting',
        email: 'nikos@test.com',
        status: 'lead',
        notes: [],
      },
    ],
    isLoading: false,
    error: '',
  };

  const updatedClient = {
    id: '1',
    name: 'Maria',
    company: 'Aegean Digital Updated',
    email: 'maria@test.com',
    status: 'inactive',
    notes: [],
  };

  const nextState = clientsReducer(
    previousState,
    clientUpdated(updatedClient),
  );

  expect(nextState.items).toHaveLength(2);
  expect(nextState.items[0]).toEqual(updatedClient);
  expect(nextState.items[1]).toEqual(previousState.items[1]);
});
test('deletes a client', () => {
  const previousState = {
    items: [
      {
        id: '1',
        name: 'Maria',
        company: 'Aegean Digital',
        email: 'maria@test.com',
        status: 'active',
        notes: [],
      },
      {
        id: '2',
        name: 'Nikos',
        company: 'Helios Consulting',
        email: 'nikos@test.com',
        status: 'lead',
        notes: [],
      },
    ],
    isLoading: false,
    error: '',
  };

  const nextState = clientsReducer(previousState, clientDeleted('1'));

  expect(nextState.items).toHaveLength(1);
  expect(nextState.items[0].id).toBe('2');
});
test('adds a note to the correct client', () => {
  const previousState = {
    items: [
      {
        id: '1',
        name: 'Maria',
        company: 'Aegean Digital',
        email: 'maria@test.com',
        status: 'active',
        notes: [],
      },
      {
        id: '2',
        name: 'Nikos',
        company: 'Helios Consulting',
        email: 'nikos@test.com',
        status: 'lead',
        notes: [],
      },
    ],
    isLoading: false,
    error: '',
  };

  const note = {
    id: 'note-1',
    text: 'Follow up next week',
    createdAt: '2026-06-06T10:00:00.000Z',
  };

  const nextState = clientsReducer(
    previousState,
    noteAdded({
      clientId: '1',
      note,
    }),
  );

  expect(nextState.items[0].notes).toHaveLength(1);
  expect(nextState.items[0].notes[0]).toEqual(note);
  expect(nextState.items[1].notes).toHaveLength(0);
});
test('deletes a note from the correct client', () => {
  const previousState = {
    items: [
      {
        id: '1',
        name: 'Maria',
        company: 'Aegean Digital',
        email: 'maria@test.com',
        status: 'active',
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
      },
      {
        id: '2',
        name: 'Nikos',
        company: 'Helios Consulting',
        email: 'nikos@test.com',
        status: 'lead',
        notes: [
          {
            id: 'note-3',
            text: 'Call on Friday',
            createdAt: '2026-06-06T12:00:00.000Z',
          },
        ],
      },
    ],
    isLoading: false,
    error: '',
  };

  const nextState = clientsReducer(
    previousState,
    noteDeleted({
      clientId: '1',
      noteId: 'note-1',
    }),
  );

  expect(nextState.items[0].notes).toHaveLength(1);
  expect(nextState.items[0].notes[0].id).toBe('note-2');

  expect(nextState.items[1].notes).toHaveLength(1);
  expect(nextState.items[1].notes[0].id).toBe('note-3');
});
test('resets clients to provided demo data', () => {
  const previousState = {
    items: [
      {
        id: 'old-client',
        name: 'Old Client',
        company: 'Old Company',
        email: 'old@test.com',
        status: 'inactive',
        notes: [],
      },
    ],
    isLoading: false,
    error: '',
  };

  const demoClients = [
    {
      id: '1',
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'active',
      notes: [],
    },
  ];

  const nextState = clientsReducer(
    previousState,
    clientsReset(demoClients),
  );

  expect(nextState.items).toEqual(demoClients);
});
