import { clients } from '../data/clients';

const STORAGE_KEY = 'clientflow_clients';

export function loadClients() {
  try {
    const savedClients = localStorage.getItem(STORAGE_KEY);

    if (savedClients) {
      return JSON.parse(savedClients);
    }

    return clients;
  } catch (error) {
    console.error('Failed to load clients from storage:', error);
    return clients;
  }
}

export function saveClients(clientList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientList));
}
