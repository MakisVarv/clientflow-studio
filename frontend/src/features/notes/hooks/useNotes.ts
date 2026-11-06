import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import noteService from '../services/noteService';

import type {
  CreateNoteRequest,
  UpdateNoteRequest,
} from '../types/note.types';

export const noteKeys = {
  all: ['notes'] as const,

  detail: (id: string) => ['notes', id] as const,

  recent: ['notes', 'recent'] as const,

  search: (query: string) => ['notes', 'search', query] as const,
};

export function useNotes() {
  return useQuery({
    queryKey: noteKeys.all,
    queryFn: noteService.getNotes,
  });
}

export function useNote(id: string) {
  return useQuery({
    queryKey: noteKeys.detail(id),

    queryFn: () => noteService.getNoteById(id),

    enabled: !!id,
  });
}

export function useRecentNotes() {
  return useQuery({
    queryKey: noteKeys.recent,
    queryFn: noteService.getRecentNotes,
  });
}

export function useSearchNotes(query: string) {
  return useQuery({
    queryKey: noteKeys.search(query),

    queryFn: () => noteService.searchNotes(query),

    enabled: query.trim().length > 0,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoteRequest) =>
      noteService.createNote(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: noteKeys.recent,
      });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateNoteRequest;
    }) => noteService.updateNote(id, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: noteKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: noteKeys.recent,
      });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => noteService.deleteNote(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: noteKeys.recent,
      });
    },
  });
}

export function usePinNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => noteService.pinNote(id),

    onSuccess: (note) => {
      queryClient.setQueryData(noteKeys.detail(note.id), note);

      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: noteKeys.recent,
      });
    },
  });
}

export function useUnpinNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => noteService.unpinNote(id),

    onSuccess: (note) => {
      queryClient.setQueryData(noteKeys.detail(note.id), note);

      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: noteKeys.recent,
      });
    },
  });
}
