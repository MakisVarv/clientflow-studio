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
  },
});

export const { setClients } = clientsSlice.actions;
export default clientsSlice.reducer;
