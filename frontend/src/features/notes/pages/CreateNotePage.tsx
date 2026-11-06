import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import NoteForm, { type NoteFormData } from '../components/NoteForm';

import { useCreateNote } from '../hooks/useNotes';

export default function CreateNotePage() {
  const navigate = useNavigate();

  const createNote = useCreateNote();

  function handleSubmit(data: NoteFormData) {
    createNote.mutate(
      {
        title: data.title,
        content: data.content,

        company_id: data.company_id || null,

        contact_id: data.contact_id || null,

        lead_id: data.lead_id || null,

        deal_id: data.deal_id || null,

        owner_id: data.owner_id,
      },
      {
        onSuccess: () => {
          toast.success('Note created successfully');

          navigate('/notes');
        },

        onError: () => {
          toast.error('Could not create note');
        },
      },
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        Create Note
      </h1>

      <NoteForm
        onSubmit={handleSubmit}
        isSubmitting={createNote.isPending}
      />
    </div>
  );
}
