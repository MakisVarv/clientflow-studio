export default function ContactCard({
  contact,
  onSelectContact,
  isSelected,
}) {
  const { id, name, company, email, status } = contact;
  const statusClass = (status) => {
    return status === 'active'
      ? { color: 'green' }
      : status === 'lead'
        ? { color: 'blue' }
        : { color: 'red' };
  };
  return (
    <div
      className={`client-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectContact(id)}
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
