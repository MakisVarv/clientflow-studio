export default function ClientDetails({
  client,
  onDeleteClient,
  onEditClient,
}) {
  if (!client) {
    return (
      <section>
        <h2>Client Details</h2>
        <p>Select a client to view details.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Client Details</h2>

      <h3>{client.name}</h3>
      <p>{client.company}</p>
      <p>{client.email}</p>
      <p>{client.status}</p>
      <button onClick={() => onEditClient(client.id)}>Edit</button>
      <button onClick={() => onDeleteClient(client.id)}>
        Delete
      </button>
    </section>
  );
}
