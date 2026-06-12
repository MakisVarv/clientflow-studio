export default function ContactStats({ contacts }) {
  const stats = contacts.reduce(
    (acc, contact) => {
      acc.total += 1;
      acc[contact.status] = (acc[contact.status] || 0) + 1;
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
  const statCards = [
    { label: 'Total Contacts', value: stats.total },
    { label: 'Active Contacts', value: stats.active },
    { label: 'Leads', value: stats.lead },
    { label: 'Inactive', value: stats.inactive },
    { label: 'Total Notes', value: stats.notes },
  ];
  return (
    <section>
      <div>
        <p>CRM Overview</p>
        <h2>Contact Pipeline</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <article
            className=" flex min-h-28 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm "
            key={card.label}
          >
            <p className="text-sm font-medium text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {card.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
