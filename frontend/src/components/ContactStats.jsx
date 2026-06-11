export default function ContactStats({ contacts }) {
  function formatLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  const statusCounts = contacts.reduce((acc, contact) => {
    acc[contact.status] = (acc[contact.status] || 0) + 1;
    return acc;
  }, {});
  const stats = contacts.reduce(
    (acc, contact) => {
      acc.total += 1;
      acc[contact.status] += 1;
      acc.notes += contact.notes?.length || 0;
      return acc;
    },
    {
      total: 0,
      active: 0,
      lead: 0,
      inactive: 0,
      notes: 0,
    },
  );
  return (
    <section className="contact-stats">
      <h2>Contact Stats</h2>
      <p>Total contacts: {stats.total}</p>
      {Object.entries(statusCounts).map(([status, count]) => (
        <p key={status}>
          {formatLabel(status)}: {count}
        </p>
      ))}
      <p>Total notes: {stats.notes}</p>
    </section>
  );
}
