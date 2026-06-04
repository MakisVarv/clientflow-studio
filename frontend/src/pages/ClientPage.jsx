import { useEffect, useState } from 'react';
import { clients } from '../data/clients';
import ClientForm from '../components/ClientForm';
import ClientFilters from '../components/ClientFilters';
import ClientList from '../components/ClientList';
import useClientFilters from '../hooks/useClientFilters';
import ClientDetails from '../components/ClientDetails';
import { useToast } from '../context/ToastContext';
import ClientStats from '../components/ClientStats';

export default function ClientPage() {
  const { showToast } = useToast();
  const [clientList, setClientList] = useState(() => {
    const savedClients = localStorage.getItem('clientflow_clients');

    if (savedClients) {
      return JSON.parse(savedClients);
    }

    return clients;
  });
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null);
  useEffect(() => {
    localStorage.setItem(
      'clientflow_clients',
      JSON.stringify(clientList),
    );
  }, [clientList]);
  function handleEdit(id) {
    setEditingClientId(id);
  }
  const editingClient = clientList.find(
    (client) => client.id === editingClientId,
  );
  const selectedClient = clientList.find(
    (client) => client.id === selectedClientId,
  );
  function handleDeleteClient(id) {
    setClientList((currentClients) =>
      currentClients.filter((client) => client.id !== id),
    );

    setSelectedClientId(null);

    if (editingClientId === id) {
      setEditingClientId(null);
    }
    showToast('Client deleted successfully');
  }
  function handleResetDemo() {
    setClientList(clients);
    setSelectedClientId(null);
    setEditingClientId(null);
    showToast('Demo data restored');
  }
  function handleCreateClient(client) {
    const emailExists = clientList.some(
      (existingClient) =>
        existingClient.email.trim().toLowerCase() ===
        client.email.trim().toLowerCase(),
    );
    if (emailExists) {
      showToast('A client with this email already exists');
      return;
    }
    setClientList((currentClients) => [...currentClients, client]);
    showToast('Client created successfully');
  }
  function handleCancelEdit() {
    setEditingClientId(null);
  }
  function handleUpdateClient(updatedClient) {
    setClientList((currentClients) =>
      currentClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client,
      ),
    );

    setEditingClientId(null);
    showToast('Client updated successfully');
  }
  function handleAddNote(clientId, noteText) {
    setClientList((currentClients) =>
      currentClients.map((client) => {
        if (client.id !== clientId) {
          return client;
        }

        return {
          ...client,
          notes: [
            ...(client.notes || []),
            {
              id: crypto.randomUUID(),
              text: noteText,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }),
    );
    showToast('Note added successfully');
  }
  function handleDeleteNote(clientId, noteId) {
    setClientList((currentClients) =>
      currentClients.map((client) => {
        if (client.id !== clientId) {
          return client;
        }

        return {
          ...client,
          notes: (client.notes || []).filter(
            (note) => note.id !== noteId,
          ),
        };
      }),
    );
    showToast('Note deleted successfully');
  }
  const {
    term,
    statusFilter,
    availableStatuses,
    filteredClients,
    handleSearchChange,
    handleStatusChange,
    handleClear,
  } = useClientFilters(clientList);

  return (
    <div className="app">
      <h1>ClientFlow Mini CRM</h1>
      <ClientFilters
        term={term}
        statuses={availableStatuses}
        statusFilter={statusFilter}
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
