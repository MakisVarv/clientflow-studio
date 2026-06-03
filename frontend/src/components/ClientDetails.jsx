import { useState } from 'react';

export default function ClientDetails({
  client,
  onDeleteClient,
  onEditClient,
  onAddNote,
  onDeleteNote,
}) {
  const [noteText, setNoteText] = useState('');
  if (!client) {
    return (
      <section>
        <h2>Client Details</h2>
        <p>Select a client to view details.</p>
      </section>
    );
  }
  function handleSubmitNote(e) {
    e.preventDefault();

    if (noteText.trim() === '') {
      return;
    }

    onAddNote(client.id, noteText.trim());
    setNoteText('');
  }
  return (
    <section>
      <h2>Client Details</h2>

      <h3>{client.name}</h3>
      <p>{client.company}</p>
      <p>{client.email}</p>
      <p>{client.status}</p>
      <button onClick={() => onEditClient(client.id)}>Edit</button>
      <button onClick={() => onDeleteClient(client.id)}>
        Delete
      </button>
      <form onSubmit={handleSubmitNote}>
        <input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add a note"
        />
        <button type="submit">Add Note</button>
      </form>
      <h4>Notes</h4>

      {(!client.notes || client.notes.length === 0) && (
        <p>No notes yet.</p>
      )}

      {client.notes?.map((note) => (
        <div key={note.id}>
          <p>{note.text}</p>
          <button onClick={() => onDeleteNote(client.id, note.id)}>
            Delete Note
          </button>
        </div>
      ))}
    </section>
  );
}
