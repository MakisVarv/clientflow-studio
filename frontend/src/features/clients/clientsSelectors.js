export const selectClients = (state) => state.clients.items;

export const selectClientsLoading = (state) =>
  state.clients.isLoading;

export const selectClientsError = (state) => state.clients.error;
