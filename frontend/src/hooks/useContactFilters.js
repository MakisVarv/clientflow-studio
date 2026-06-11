import { useState } from 'react';

export default function useContactFilters(list) {
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
    ...new Set(list.map((contact) => contact.status)),
  ];
  const filteredContacts = list.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(term) ||
      contact.company.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'all' ||
      contact.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const sortedContacts = filteredContacts.toSorted((a, b) => {
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
    filteredContacts: sortedContacts,
    sortBy,
    handleSortChange,
    handleSearchChange,
    handleStatusChange,
    handleClear,
  };
}
