import { useState } from 'react';

export default function useClientFilters(list) {
  const [term, setTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setTerm(value);
  }
  function handleStatusChange(e) {
    const value = e.target.value.toLowerCase();
    setStatusFilter(value);
  }
  function handleClear() {
    setTerm('');
    setStatusFilter('all');
  }
  const filteredClients = list.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(term) ||
      client.company.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'all' ||
      client.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return {
    term,
    statusFilter,
    filteredClients,
    handleSearchChange,
    handleStatusChange,
    handleClear,
  };
}
