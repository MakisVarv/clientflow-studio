import { useEffect, useState } from 'react';
import ClientForm from '../components/ClientForm';
import ClientFilters from '../components/ClientFilters';
import ClientList from '../components/ClientList';
import useClientFilters from '../hooks/useClientFilters';
import ClientDetails from '../components/ClientDetails';
import { useToast } from '../context/ToastContext';
import ClientStats from '../components/ClientStats';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNoteToClientThunk,
  createClientThunk,
  deleteClientThunk,
  deleteNoteFromClientThunk,
  fetchClients,
  resetDemoClientsThunk,
  updateClientThunk,
} from '../store/clients/clientsSlice';

import {
  selectClients,
  selectClientsError,
  selectClientsLoading,
} from '../store/clients/clientsSelectors';

export default function ClientPage() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const clientList = useSelector(selectClients);
  const isLoading = useSelector(selectClientsLoading);
  const loadError = useSelector(selectClientsError);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null);
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  function handleEdit(id) {
    setEditingClientId(id);
  }
  const editingClient = clientList.find(
    (client) => client.id === editingClientId,
  );
  const selectedClient = clientList.find(
    (client) => client.id === selectedClientId,
  );
  async function handleDeleteClient(id) {
    try {
      await dispatch(deleteClientThunk(id)).unwrap();
      setSelectedClientId(null);

      if (editingClientId === id) {
        setEditingClientId(null);
      }

      showToast('Client deleted successfully');
    } catch {
      showToast('Failed to delete client');
    }
  }
  async function handleResetDemo() {
    try {
      await dispatch(resetDemoClientsThunk()).unwrap();
      setSelectedClientId(null);
      setEditingClientId(null);
      showToast('Demo data restored');
    } catch {
      showToast('Failed to reset demo data');
    }
  }
  async function handleCreateClient(client) {
    const emailExists = clientList.some(
      (existingClient) =>
        existingClient.email.trim().toLowerCase() ===
        client.email.trim().toLowerCase(),
    );
    if (emailExists) {
      showToast('A client with this email already exists');
      return;
    }
    try {
      await dispatch(createClientThunk(client)).unwrap();
      showToast('Client created successfully');
    } catch {
      showToast('Failed to create client');
    }
  }
  function handleCancelEdit() {
    setEditingClientId(null);
  }
  async function handleUpdateClient(updatedClient) {
    try {
      await dispatch(updateClientThunk(updatedClient)).unwrap();

      setEditingClientId(null);
      showToast('Client updated successfully');
    } catch {
      showToast('Failed to update client');
    }
  }
  async function handleAddNote(clientId, noteText) {
    try {
      await dispatch(
        addNoteToClientThunk({ clientId, noteText }),
      ).unwrap();

      showToast('Note added successfully');
    } catch {
      showToast('Failed to add note');
    }
  }
  async function handleDeleteNote(clientId, noteId) {
    try {
      await dispatch(
        deleteNoteFromClientThunk({ clientId, noteId }),
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
    filteredClients,
    sortBy,
    handleSortChange,
    handleSearchChange,
    handleStatusChange,
    handleClear,
  } = useClientFilters(clientList);
  if (loadError) {
    return <p>{loadError}</p>;
  }
  if (isLoading) {
    return <p>Loading clients...</p>;
  }
  return (
    <div className="app">
      <h1 className="text-3xl font-bold text-slate-900">
        ClientFlow
      </h1>
      <ClientFilters
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
            Reset Demo clients
          </button>
          <ClientStats clients={clientList} />
          <ClientList
            clients={filteredClients}
            totalClients={clientList}
            selectedClientId={selectedClientId}
            onSelectClient={setSelectedClientId}
          />
        </div>
        <div className="side-panel">
          <ClientDetails
            client={selectedClient}
            onDeleteClient={handleDeleteClient}
            onEditClient={handleEdit}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
          <ClientForm
            onCreateClient={handleCreateClient}
            onCancelEdit={handleCancelEdit}
            onUpdateClient={handleUpdateClient}
            editingClient={editingClient}
          />
        </div>
      </div>
    </div>
  );
}
