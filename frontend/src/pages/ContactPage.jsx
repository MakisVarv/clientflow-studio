import { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactFilters from '../components/ContactFilters';
import ContactList from '../components/ContactList';
import useContactFilters from '../hooks/useContactFilters';
import ContactDetails from '../components/ContactDetails';
import { useToast } from '../context/ToastContext';
import ContactStats from '../components/ContactStats';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNoteToContactThunk,
  createContactThunk,
  deleteContactThunk,
  deleteNoteFromContactThunk,
  fetchContacts,
  resetDemoContactsThunk,
  updateContactThunk,
} from '../store/contacts/contactsSlice';

import {
  selectContacts,
  selectContactsError,
  selectContactsLoading,
} from '../store/contacts/contactsSelectors';

export default function ContactPage() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const contactList = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsLoading);
  const loadError = useSelector(selectContactsError);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [editingContactId, setEditingContactId] = useState(null);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function handleEdit(id) {
    setEditingContactId(id);
  }
  const editingContact = contactList.find(
    (contact) => contact.id === editingContactId,
  );
  const selectedContact = contactList.find(
    (contact) => contact.id === selectedContactId,
  );
  async function handleDeleteContact(id) {
    try {
      await dispatch(deleteContactThunk(id)).unwrap();
      setSelectedContactId(null);

      if (editingContactId === id) {
        setEditingContactId(null);
      }

      showToast('Contact deleted successfully');
    } catch {
      showToast('Failed to delete contact');
    }
  }
  async function handleResetDemo() {
    try {
      await dispatch(resetDemoContactsThunk()).unwrap();
      setSelectedContactId(null);
      setEditingContactId(null);
      showToast('Demo data restored');
    } catch {
      showToast('Failed to reset demo data');
    }
  }
  async function handleCreateContact(contact) {
    const emailExists = contactList.some(
      (existingContact) =>
        existingContact.email.trim().toLowerCase() ===
        contact.email.trim().toLowerCase(),
    );
    if (emailExists) {
      showToast('A contact with this email already exists');
      return;
    }
    try {
      await dispatch(createContactThunk(contact)).unwrap();
      showToast('Contact created successfully');
    } catch {
      showToast('Failed to create contact');
    }
  }
  function handleCancelEdit() {
    setEditingContactId(null);
  }
  async function handleUpdateContact(updatedContact) {
    try {
      await dispatch(updateContactThunk(updatedContact)).unwrap();

      setEditingContactId(null);
      showToast('Contact updated successfully');
    } catch {
      showToast('Failed to update contact');
    }
  }
  async function handleAddNote(contactId, noteText) {
    try {
      await dispatch(
        addNoteToContactThunk({ contactId, noteText }),
      ).unwrap();

      showToast('Note added successfully');
    } catch {
      showToast('Failed to add note');
    }
  }
  async function handleDeleteNote(contactId, noteId) {
    try {
      await dispatch(
        deleteNoteFromContactThunk({ contactId, noteId }),
      ).unwrap();
      showToast('Note delete successfully');
    } catch {
      showToast('Failed to delete note');
    }
  }
  const {
    term,
    statusFilter,
    availableStatuses,
    filteredContacts,
    sortBy,
    handleSortChange,
    handleSearchChange,
    handleStatusChange,
    handleClear,
  } = useContactFilters(contactList);
  if (loadError) {
    return <p>{loadError}</p>;
  }
  if (isLoading) {
    return <p>Loading contacts...</p>;
  }
  return (
    <div className="app">
      <h1 className="text-3xl font-bold text-slate-900">
        ContactFlow
      </h1>
      <ContactFilters
        term={term}
        statuses={availableStatuses}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onClear={handleClear}
      />
      <div className="workspace">
        <div>
          <button onClick={handleResetDemo}>
            Reset Demo contacts
          </button>
          <ContactStats contacts={contactList} />
          <ContactList
            contacts={filteredContacts}
            totalContacts={contactList}
            selectedContactId={selectedContactId}
            onSelectContact={setSelectedContactId}
          />
        </div>
        <div className="side-panel">
          <ContactDetails
            contact={selectedContact}
            onDeleteContact={handleDeleteContact}
            onEditContact={handleEdit}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
          <ContactForm
            onCreateContact={handleCreateContact}
            onCancelEdit={handleCancelEdit}
            onUpdateContact={handleUpdateContact}
            editingContact={editingContact}
          />
        </div>
      </div>
    </div>
  );
}
