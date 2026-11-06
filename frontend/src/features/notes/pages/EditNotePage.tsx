import { useNavigate, useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import NoteForm, { type NoteFormData } from '../components/NoteForm';

import { useNote, useUpdateNote } from '../hooks/useNotes';

export default function EditNotePage() {
  const { id = '' } = useParams();

  const navigate = useNavigate();

  const { data: note, isLoading } = useNote(id);

  const updateNote = useUpdateNote();

  if (isLoading) {
    return <div className="p-6">Loading note...</div>;
  }

  if (!note) {
    return <div className="p-6">Note not found.</div>;
  }

  function handleSubmit(data: NoteFormData) {
    updateNote.mutate(
      {
        id,

        data: {
          title: data.title,
          content: data.content,
        },
      },
      {
        onSuccess: () => {
          toast.success('Note updated successfully');

          navigate('/notes');
        },

        onError: () => {
          toast.error('Could not update note');
        },
      },
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        Edit Note
      </h1>

      <NoteForm
        initialValues={{
          title: note.title,

          content: note.content,

          company_id: note.company_id ?? '',

          contact_id: note.contact_id ?? '',

          lead_id: note.lead_id ?? '',

          deal_id: note.deal_id ?? '',

          owner_id: note.owner_id,
        }}
        onSubmit={handleSubmit}
        isSubmitting={updateNote.isPending}
        disableRelations
      />
    </div>
  );
}
