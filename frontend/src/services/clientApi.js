import { clients } from '../data/clients';
import { loadClients, saveClients } from './clientStorage';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getClients() {
  await delay(300);
  return loadClients();
}
export async function createClient(newClient) {
  await delay(300);

  const currentClients = loadClients();
  const updatedClients = [...currentClients, newClient];

  saveClients(updatedClients);

  return updatedClients;
}
export async function updateClient(updatedClient) {
  await delay(300);

  const currentClients = loadClients();

  const updatedClients = currentClients.map((client) =>
    client.id === updatedClient.id ? updatedClient : client,
  );

  saveClients(updatedClients);

  return updatedClients;
}
export async function deleteClient(clientId) {
  await delay(300);

  const currentClients = loadClients();

  const updatedClients = currentClients.filter(
    (client) => client.id !== clientId,
  );

  saveClients(updatedClients);

  return updatedClients;
}
export async function addNote(clientId, noteText) {
  await delay(300);

  const currentClients = loadClients();

  const note = {
    id: crypto.randomUUID(),
    text: noteText,
    createdAt: new Date().toISOString(),
  };

  const updatedClients = currentClients.map((client) => {
    if (client.id !== clientId) {
      return client;
    }

    return {
      ...client,
      notes: [...(client.notes || []), note],
    };
  });

  saveClients(updatedClients);

  return note;
}
export async function deleteNote(clientId, noteId) {
  await delay(300);

  const currentClients = loadClients();

  const updatedClients = currentClients.map((client) => {
    if (client.id !== clientId) return client;

    return {
      ...client,
      notes: (client.notes || []).filter(
        (note) => note.id !== noteId,
      ),
    };
  });

  saveClients(updatedClients);

  return { clientId, noteId };
}
export async function resetClients() {
  await delay(300);

  saveClients(clients);

  return clients;
}
