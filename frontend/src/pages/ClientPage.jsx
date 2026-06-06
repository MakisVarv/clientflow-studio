/* eslint-disable no-unused-vars */
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
  clientAdded,
  clientDeleted,
  clientsReset,
  clientUpdated,
  noteAdded,
  noteDeleted,
  setClients,
  setClientsError,
  setClientsLoading,
} from '../features/clients/clientsSlice';
import {
  addNote,
  createClient,
  deleteClient,
  deleteNote,
  getClients,
  resetClients,
  updateClient,
} from '../services/clientApi';
import {
  selectClients,
  selectClientsError,
  selectClientsLoading,
} from '../features/clients/clientsSelectors';

export default function ClientPage() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const clientList = useSelector(selectClients);
  const isLoading = useSelector(selectClientsLoading);
  const loadError = useSelector(selectClientsError);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null);
  useEffect(() => {
    let isMounted = true;

    async function loadInitialClients() {
      try {
        const loadedClients = await getClients();

        if (isMounted) {
          dispatch(setClients(loadedClients));
        }
      } catch (error) {
        if (isMounted) {
          dispatch(setClientsError('Failed to load clients.'));
        }
      } finally {
        if (isMounted) {
          dispatch(setClientsLoading(false));
        }
      }
    }

    loadInitialClients();

    return () => {
      isMounted = false;
    };
  }, []);

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
      await deleteClient(id);

      dispatch(clientDeleted(id));
      setSelectedClientId(null);

      if (editingClientId === id) {
        setEditingClientId(null);
      }

      showToast('Client deleted successfully');
    } catch (error) {
      showToast('Failed to delete client');
    }
  }
  async function handleResetDemo() {
    try {
      const resetData = await resetClients();

      dispatch(clientsReset(resetData));

      setSelectedClientId(null);
      setEditingClientId(null);
      showToast('Demo data restored');
    } catch (error) {
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
      await createClient(client);
      dispatch(clientAdded(client));
      showToast('Client created successfully');
    } catch (error) {
      console.log(error);
      showToast('Failed to create client');
    }
  }
  function handleCancelEdit() {
    setEditingClientId(null);
  }
  async function handleUpdateClient(updatedClient) {
    try {
      await updateClient(updatedClient);
      dispatch(clientUpdated(updatedClient));

      showToast('Client updated successfully');
    } catch (error) {
      showToast('Failed to update client');
    }
  }
  async function handleAddNote(clientId, noteText) {
    try {
      const note = await addNote(clientId, noteText);

      dispatch(noteAdded({ clientId, note }));
      showToast('Note added successfully');
    } catch (error) {
      showToast('Failed to add note');
    }
  }
  async function handleDeleteNote(clientId, noteId) {
    try {
      await deleteNote(clientId, noteId);

      dispatch(noteDeleted({ clientId, noteId }));
      showToast('Note delete successfully');
    } catch (error) {
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
      <h1>ClientFlow Mini CRM</h1>
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
