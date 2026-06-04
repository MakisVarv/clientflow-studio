export default function ClientStats({ clients }) {
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
      <p>Active: {stats.active}</p>
      <p>Leads: {stats.lead}</p>
      <p>Inactive: {stats.inactive}</p>
      <p>Total notes: {stats.notes}</p>
    </section>
  );
}
