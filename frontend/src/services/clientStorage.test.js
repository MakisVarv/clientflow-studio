import { expect, test, beforeEach, vi } from 'vitest';
import { loadClients, saveClients } from './clientStorage';
import { clients } from '../data/clients';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

beforeEach(() => {
  localStorage.clear();
});

test('saves clients to localStorage', () => {
  const clients = [
    {
      id: '1',
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'active',
      notes: [],
    },
  ];

  saveClients(clients);

  const saved = JSON.parse(
    localStorage.getItem('clientflow_clients'),
  );

  expect(saved).toEqual(clients);
});

test('loads clients from localStorage when saved data exists', () => {
  const savedClients = [
    {
      id: '1',
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'active',
      notes: [],
    },
  ];

  localStorage.setItem(
    'clientflow_clients',
    JSON.stringify(savedClients),
  );

  const result = loadClients();

  expect(result).toEqual(savedClients);
});
test('returns seed clients when localStorage contains invalid JSON', () => {
  localStorage.setItem('clientflow_clients', 'not-valid-json');

  const result = loadClients();

  expect(result).toEqual(clients);
});
