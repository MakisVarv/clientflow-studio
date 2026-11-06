import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Pin,
  PinOff,
  Pencil,
  Trash2,
  Plus,
  Search,
} from 'lucide-react';

import {
  useNotes,
  usePinNote,
  useUnpinNote,
  useDeleteNote,
} from '../hooks/useNotes';

export default function NotesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const { data: notes = [], isLoading } = useNotes();

  const pinNote = usePinNote();

  const unpinNote = useUnpinNote();

  const deleteNote = useDeleteNote();

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = !query
      ? notes
      : notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query),
        );

    return [...result].sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) {
        return a.is_pinned ? -1 : 1;
      }

      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
      );
    });
  }, [notes, search]);

  function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this note?');

    if (!confirmed) {
      return;
    }

    deleteNote.mutate(id);
  }

  if (isLoading) {
    return <div className="p-6">Loading notes...</div>;
  }

  return (
    <div className="p-6">
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-slate-800
            "
          >
            Notes
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Manage CRM notes and related records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/notes/new')}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-blue-600
            px-4
            py-2
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Plus size={18} />
          New Note
        </button>
      </div>

      <div
        className="
          mb-6
          flex
          max-w-xl
          items-center
          gap-2
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3
        "
      >
        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search notes..."
          className="
            w-full
            py-2
            outline-none
          "
        />
      </div>

      {filteredNotes.length === 0 ? (
        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-10
            text-center
            text-slate-500
          "
        >
          No notes found.
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`
                  rounded-xl
                  border
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:shadow-md

                  ${
                    note.is_pinned
                      ? 'border-amber-300'
                      : 'border-slate-200'
                  }
                `}
            >
              <div
                className="
                    mb-3
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
              >
                <div
                  className="
                      min-w-0
                      flex-1
                    "
                >
                  <div
                    className="
                        flex
                        items-center
                        gap-2
                      "
                  >
                    {note.is_pinned && (
                      <Pin
                        size={16}
                        className="
                            shrink-0
                            text-amber-500
                          "
                      />
                    )}

                    <h3
                      className="
                          truncate
                          text-lg
                          font-semibold
                          text-slate-800
                        "
                    >
                      {note.title}
                    </h3>
                  </div>
                </div>

                <div
                  className="
                      flex
                      items-center
                      gap-1
                    "
                >
                  {note.is_pinned ? (
                    <button
                      type="button"
                      title="Unpin"
                      onClick={() => unpinNote.mutate(note.id)}
                      className="
                          rounded-lg
                          p-2
                          text-amber-600
                          transition
                          hover:bg-amber-50
                        "
                    >
                      <PinOff size={17} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      title="Pin"
                      onClick={() => pinNote.mutate(note.id)}
                      className="
                          rounded-lg
                          p-2
                          text-slate-500
                          transition
                          hover:bg-slate-100
                          hover:text-amber-600
                        "
                    >
                      <Pin size={17} />
                    </button>
                  )}

                  <button
                    type="button"
                    title="Edit"
                    onClick={() => navigate(`/notes/${note.id}/edit`)}
                    className="
                        rounded-lg
                        p-2
                        text-slate-500
                        transition
                        hover:bg-blue-50
                        hover:text-blue-600
                      "
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    title="Delete"
                    onClick={() => handleDelete(note.id)}
                    className="
                        rounded-lg
                        p-2
                        text-slate-500
                        transition
                        hover:bg-red-50
                        hover:text-red-600
                      "
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <p
                className="
                    line-clamp-5
                    whitespace-pre-wrap
                    text-sm
                    leading-6
                    text-slate-600
                  "
              >
                {note.content}
              </p>

              <div
                className="
                    mt-5
                    border-t
                    border-slate-100
                    pt-3
                    text-xs
                    text-slate-400
                  "
              >
                Updated {new Date(note.updated_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
