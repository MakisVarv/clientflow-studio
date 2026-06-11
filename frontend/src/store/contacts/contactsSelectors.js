export const selectContacts = (state) => state.contacts.items;

export const selectContactsLoading = (state) =>
  state.contacts.isLoading;

export const selectContactsError = (state) => state.contacts.error;
