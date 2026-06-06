export default function ClientStats({ clients }) {
  function formatLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  const statusCounts = clients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {});
  const stats = clients.reduce(
    (acc, client) => {
      acc.total += 1;
      acc[client.status] += 1;
      acc.notes += client.notes?.length || 0;
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
    <section className="client-stats">
      <h2>Client Stats</h2>
      <p>Total clients: {stats.total}</p>
      {Object.entries(statusCounts).map(([status, count]) => (
        <p key={status}>
          {formatLabel(status)}: {count}
        </p>
      ))}
      <p>Total notes: {stats.notes}</p>
    </section>
  );
}
