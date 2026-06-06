export default function ClientFilters({
  term,
  statusFilter,
  statuses,
  sortBy,
  onSortChange,
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
      </select>
      <select value={sortBy} onChange={onSortChange}>
        <option value="name">Name</option>
        <option value="company">Company</option>
        <option value="status">Status</option>
      </select>
      <button onClick={onClear}>Clear Filters</button>
    </div>
  );
}
