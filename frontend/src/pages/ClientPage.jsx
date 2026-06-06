import { useEffect, useState } from 'react';
import ClientForm from '../components/ClientForm';
import ClientFilters from '../components/ClientFilters';
import ClientList from '../components/ClientList';
import useClientFilters from '../hooks/useClientFilters';
import ClientDetails from '../components/ClientDetails';
import { useToast } from '../context/ToastContext';
import ClientStats from '../components/ClientStats';
import { useDispatch, useSelector } from 'react-redux';
import { setClients } from '../features/clients/clientsSlice';
import {
  addNote,
  createClient,
  deleteClient,
  deleteNote,
  getClients,
  resetClients,
  updateClient,
} from '../services/clientApi';

export default function ClientPage() {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const clientList = useSelector((state) => state.clients.items);
  const [loadError, setLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
          setLoadError('Failed to load clients.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
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
      const updatedClients = await deleteClient(id);

      dispatch(setClients(updatedClients));
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

      dispatch(setClients(resetData));
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
      const updatedClients = await createClient(client);
      dispatch(setClients(updatedClients));
      showToast('Client created successfully');
    } catch (error) {
      showToast('Failed to create client');
    }
  }
  function handleCancelEdit() {
    setEditingClientId(null);
  }
  async function handleUpdateClient(updatedClient) {
    try {
      const updatedClients = await updateClient(updatedClient);

      dispatch(setClients(updatedClients));
      showToast('Client updated successfully');
    } catch (error) {
      showToast('Failed to update client');
    }
  }
  async function handleAddNote(clientId, noteText) {
    try {
      const updatedClients = await addNote(clientId, noteText);
      dispatch(setClients(updatedClients));
      showToast('Note added successfully');
    } catch (error) {
      showToast('Failed to add note');
    }
  }
  async function handleDeleteNote(clientId, noteId) {
    try {
      const updatedClients = await deleteNote(clientId, noteId);
      dispatch(setClients(updatedClients));
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
