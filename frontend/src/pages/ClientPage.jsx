import { useState } from 'react';
import { clients } from '../data/clients';
import ClientForm from './ClientForm';
import ClientFilters from '../components/ClientFilters';
import ClientList from '../components/ClientList';
import useClientFilters from '../hooks/useClientFilters';
import ClientDetails from '../components/ClientDetails';

export default function ClientPage() {
  const [clientList, setClientList] = useState(clients);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null);
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
  }
  function handleCreateClient(client) {
    setClientList((currentClients) => [...currentClients, client]);
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
  }
  const {
    term,
    statusFilter,
    filteredClients,
    handleSearchChange,
    handleStatusChange,
    handleClear,
  } = useClientFilters(clientList);

  return (
    <div>
      <ClientFilters
        term={term}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onClear={handleClear}
      />
      <div className="container">
        <ClientList
          clients={filteredClients}
          totalClients={clientList}
          selectedClientId={selectedClientId}
          onSelectClient={setSelectedClientId}
        />
        <div>
          <ClientDetails
            client={selectedClient}
            onDeleteClient={handleDeleteClient}
            onEditClient={handleEdit}
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
