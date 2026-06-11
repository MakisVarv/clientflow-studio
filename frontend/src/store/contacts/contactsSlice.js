import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addNote,
  createContact,
  deleteContact,
  deleteNote,
  getContacts,
  resetContacts,
  updateContact,
} from '../../services/contactApi';

const initialState = {
  items: [],
  isLoading: false,
  error: '',
};
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const contacts = await getContacts();
    return contacts;
  },
);
export const createContactThunk = createAsyncThunk(
  'contacts/createContact',
  async (contact) => {
    await createContact(contact);
    return contact;
  },
);
export const updateContactThunk = createAsyncThunk(
  'contacts/updateContact',
  async (updatedContact) => {
    await updateContact(updatedContact);
    return updatedContact;
  },
);
export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId) => {
    await deleteContact(contactId);
    return contactId;
  },
);
export const addNoteToContactThunk = createAsyncThunk(
  'contacts/addNote',
  async ({ contactId, noteText }) => {
    const note = await addNote(contactId, noteText);
    return {
      contactId,
      note,
    };
  },
);
export const deleteNoteFromContactThunk = createAsyncThunk(
  'contacts/deleteNote',
  async ({ contactId, noteId }) => {
    const result = await deleteNote(contactId, noteId);
    return result;
  },
);
export const resetDemoContactsThunk = createAsyncThunk(
  'contacts/reset',
  async () => {
    const contacts = await resetContacts();
    return contacts;
  },
);
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to load contacts.';
      })
      .addCase(createContactThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(createContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createContactThunk.rejected, (state) => {
        state.error = 'Failed to create contact.';
      })
      .addCase(updateContactThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        const updatedContact = action.payload;

        const index = state.items.findIndex(
          (contact) => contact.id === updatedContact.id,
        );

        if (index !== -1) {
          state.items[index] = updatedContact;
        }
      })
      .addCase(updateContactThunk.rejected, (state) => {
        state.error = 'Failed to update contact.';
      })
      .addCase(deleteContactThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload,
        );
      })
      .addCase(deleteContactThunk.rejected, (state) => {
        state.error = 'Failed to delete contact.';
      })
      .addCase(addNoteToContactThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(addNoteToContactThunk.fulfilled, (state, action) => {
        const { contactId, note } = action.payload;
        const contact = state.items.find(
          (contact) => contact.id === contactId,
        );
        if (contact) {
          contact.notes = contact.notes || [];
          contact.notes.push(note);
        }
      })
      .addCase(addNoteToContactThunk.rejected, (state) => {
        state.error = 'Failed to add note to contact.';
      })
      .addCase(deleteNoteFromContactThunk.pending, (state) => {
        state.error = '';
      })
      .addCase(
        deleteNoteFromContactThunk.fulfilled,
        (state, action) => {
          const { contactId, noteId } = action.payload;
          const contact = state.items.find(
            (contact) => contact.id === contactId,
          );
          if (contact && contact.notes) {
            contact.notes = contact.notes.filter(
              (note) => note.id !== noteId,
            );
          }
        },
      )
      .addCase(deleteNoteFromContactThunk.rejected, (state) => {
        state.error = 'Failed to delete note.';
      })
      .addCase(resetDemoContactsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(resetDemoContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(resetDemoContactsThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to reset contacts.';
      });
  },
});
export default contactsSlice.reducer;
