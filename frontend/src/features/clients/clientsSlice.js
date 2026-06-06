import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: '',
};

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
