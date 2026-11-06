import api from '../../../api/axios';

import type {
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
} from '../types/note.types';

async function getNotes(): Promise<Note[]> {
  const response = await api.get<Note[]>('/notes');

  return response.data;
}

async function getNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
}

async function createNote(data: CreateNoteRequest): Promise<Note> {
  const response = await api.post<Note>('/notes', data);

  return response.data;
}

async function updateNote(
  id: string,
  data: UpdateNoteRequest,
): Promise<Note> {
  const response = await api.put<Note>(`/notes/${id}`, data);

  return response.data;
}

async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}

async function pinNote(id: string): Promise<Note> {
  const response = await api.put<Note>(`/notes/${id}/pin`);

  return response.data;
}

async function unpinNote(id: string): Promise<Note> {
  const response = await api.put<Note>(`/notes/${id}/unpin`);

  return response.data;
}

async function getRecentNotes(): Promise<Note[]> {
  const response = await api.get<Note[]>('/notes/recent');

  return response.data;
}

async function searchNotes(query: string): Promise<Note[]> {
  const response = await api.get<Note[]>('/notes/search', {
    params: {
      q: query,
    },
  });

  return response.data;
}

const noteService = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  pinNote,
  unpinNote,
  getRecentNotes,
  searchNotes,
};

export default noteService;
