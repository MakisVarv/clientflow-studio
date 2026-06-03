export default function ClientFilters({
  term,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onClear,
}) {
  return (
    <>
      <input value={term} onChange={onSearchChange} />
      <select value={statusFilter} onChange={onStatusChange}>
        <option>all</option>
        <option>active</option>
        <option>inactive</option>
        <option>lead</option>
      </select>
      <button onClick={onClear}>Clear Filters</button>
    </>
  );
}
