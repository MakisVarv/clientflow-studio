export default function ClientCard({
  client,
  onSelectClient,
  isSelected,
}) {
  const { id, name, company, email, status } = client;
  const statusClass = (status) => {
    return status === 'active'
      ? { color: 'green' }
      : status === 'lead'
        ? { color: 'blue' }
        : { color: 'red' };
  };
  return (
    <div
      onClick={() => onSelectClient(id)}
      style={{
        border: isSelected ? '2px solid blue' : '1px solid gray',
        cursor: 'pointer',
        padding: '12px',
        marginBottom: '8px',
      }}
    >
      <h2>{name}</h2>
      <p>{company}</p>
      <p>{email}</p>
      <p style={statusClass(status)}>{status}</p>
    </div>
  );
}
