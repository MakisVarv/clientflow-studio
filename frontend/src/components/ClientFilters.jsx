export default function ClientFilters({
  term,
  statusFilter,
  statuses,
  onSearchChange,
  onStatusChange,
  onClear,
}) {
  return (
    <div className="filters">
      <input value={term} onChange={onSearchChange} />
      <select value={statusFilter} onChange={onStatusChange}>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
        ;
      </select>
      <button onClick={onClear}>Clear Filters</button>
    </div>
  );
}
