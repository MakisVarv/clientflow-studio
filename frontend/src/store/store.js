import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clients/clientsSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
});
