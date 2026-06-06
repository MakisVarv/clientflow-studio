import { useState } from 'react';

export default function useClientFilters(list) {
  const [term, setTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setTerm(value);
  }
  function handleStatusChange(e) {
    const value = e.target.value.toLowerCase();
    setStatusFilter(value);
  }
  function handleSortChange(e) {
    setSortBy(e.target.value);
  }
  function handleClear() {
    setTerm('');
    setStatusFilter('all');
  }
  const availableStatuses = [
    'all',
    ...new Set(list.map((client) => client.status)),
  ];
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
  const sortedClients = filteredClients.toSorted((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'company') {
      return a.company.localeCompare(b.company);
    }

    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }

    if (sortBy === 'newest') {
      return String(b.id).localeCompare(String(a.id));
    }

    return 0;
  });
  return {
    term,
    statusFilter,
    availableStatuses,
    filteredClients: sortedClients,
    sortBy,
    handleSortChange,
    handleSearchChange,
    handleStatusChange,
    handleClear,
  };
}
