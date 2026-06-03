import ClientCard from './ClientCard';

export default function ClientList({
  clients,
  totalClients,
  selectedClientId,
  onSelectClient,
}) {
  return (
    <div className="client-list">
      {clients.length === 0 && <p>No Clients found</p>}
      <p>
        {clients.length} clients out of {totalClients.length} found.
      </p>

      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onSelectClient={onSelectClient}
          isSelected={client.id === selectedClientId}
        />
      ))}
    </div>
  );
}
