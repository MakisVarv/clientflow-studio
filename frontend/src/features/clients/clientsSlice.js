import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addNote,
  createClient,
  deleteClient,
  deleteNote,
  getClients,
  resetClients,
  updateClient,
} from '../../services/clientApi';

const initialState = {
  items: [],
  isLoading: false,
  error: '',
};
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const clients = await getClients();
    return clients;
  },
);
export const createClientThunk = createAsyncThunk(
  'clients/createClient',
  async (client) => {
    await createClient(client);
    return client;
  },
);
export const updateClientThunk = createAsyncThunk(
  'clients/updateClient',
  async (updatedClient) => {
    await updateClient(updatedClient);
    return updatedClient;
  },
);
export const deleteClientThunk = createAsyncThunk(
  'clients/deleteClient',
  async (clientId) => {
    await deleteClient(clientId);
    return clientId;
  },
);
export const addNoteToClientThunk = createAsyncThunk(
  'clients/addNote',
  async ({ clientId, noteText }) => {
    const note = await addNote(clientId, noteText);
    return {
      clientId,
      note,
    };
  },
);
export const deleteNoteFromClientThunk = createAsyncThunk(
  'clients/deleteNote',
  async ({ clientId, noteId }) => {
    const result = await deleteNote(clientId, noteId);
    return result;
  },
);
export const resetDemoClientsThunk = createAsyncThunk(
  'clients/reset',
  async () => {
    const clients = await resetClients();
    return clients;
  },
);
const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients(state, action) {
      state.items = action.payload;
    },
    setClientsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setClientsError(state, action) {
      state.error = action.payload;
    },
    clientAdded(state, action) {
      state.items.push(action.payload);
    },
    clientUpdated(state, action) {
      const updatedClient = action.payload;

      const index = state.items.findIndex(
        (client) => client.id === updatedClient.id,
      );

      if (index !== -1) {
        state.items[index] = updatedClient;
      }
    },
    clientDeleted(state, action) {
      state.items = state.items.filter(
        (client) => client.id !== action.payload,
      );
    },
    noteAdded(state, action) {
      const { clientId, note } = action.payload;

      const client = state.items.find(
        (client) => client.id === clientId,
      );

      if (client) {
        client.notes = client.notes || [];
        client.notes.push(note);
      }
    },
    noteDeleted(state, action) {
      const { clientId, noteId } = action.payload;

      const client = state.items.find(
        (client) => client.id === clientId,
      );

      if (client) {
        client.notes = (client.notes || []).filter(
          (note) => note.id !== noteId,
        );
      }
    },
    clientsReset(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to load clients.';
      })
      .addCase(createClientThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(createClientThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createClientThunk.rejected, (state) => {
        state.error = 'Failed to create client.';
      })
      .addCase(updateClientThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(updateClientThunk.fulfilled, (state, action) => {
        const updatedClient = action.payload;

        const index = state.items.findIndex(
          (client) => client.id === updatedClient.id,
        );

        if (index !== -1) {
          state.items[index] = updatedClient;
        }
      })
      .addCase(updateClientThunk.rejected, (state) => {
        state.error = 'Failed to update client.';
      })
      .addCase(deleteClientThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(deleteClientThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (client) => client.id !== action.payload,
        );
      })
      .addCase(deleteClientThunk.rejected, (state) => {
        state.error = 'Failed to delete client.';
      })
      .addCase(addNoteToClientThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(addNoteToClientThunk.fulfilled, (state, action) => {
        const { clientId, note } = action.payload;
        const client = state.items.find(
          (client) => client.id === clientId,
        );
        if (client) {
          client.notes = client.notes || [];
          client.notes.push(note);
        }
      })
      .addCase(addNoteToClientThunk.rejected, (state) => {
        state.error = 'Failed to add note to client.';
      })
      .addCase(deleteNoteFromClientThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(
        deleteNoteFromClientThunk.fulfilled,
        (state, action) => {
          const { clientId, noteId } = action.payload;
          const client = state.items.find(
            (client) => client.id === clientId,
          );
          if (client && client.notes) {
            client.notes = client.notes.filter(
              (note) => note.id !== noteId,
            );
          }
        },
      )
      .addCase(deleteNoteFromClientThunk.rejected, (state) => {
        state.error = 'Failed to delete note.';
      })
      .addCase(resetDemoClientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(resetDemoClientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(resetDemoClientsThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to reset clients.';
      });
  },
});

export const {
  setClients,
  setClientsLoading,
  setClientsError,
  clientAdded,
  clientUpdated,
  clientDeleted,
  noteAdded,
  noteDeleted,
  clientsReset,
} = clientsSlice.actions;
export default clientsSlice.reducer;
