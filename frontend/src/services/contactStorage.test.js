import { expect, test, beforeEach, vi } from 'vitest';
import { loadContacts, saveContacts } from './contactStorage';
import { contacts } from '../data/contacts';

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

test('saves contacts to localStorage', () => {
  const contacts = [
    {
      id: '1',
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'active',
      notes: [],
    },
  ];

  saveContacts(contacts);

  const saved = JSON.parse(
    localStorage.getItem('clientflow_contacts'),
  );

  expect(saved).toEqual(contacts);
});

test('loads contacts from localStorage when saved data exists', () => {
  const savedContacts = [
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
    'clientflow_contacts',
    JSON.stringify(savedContacts),
  );

  const result = loadContacts();

  expect(result).toEqual(savedContacts);
});
test('returns seed contacts when localStorage contains invalid JSON', () => {
  localStorage.setItem('clientflow_contacts', 'not-valid-json');

  const result = loadContacts();

  expect(result).toEqual(contacts);
});
