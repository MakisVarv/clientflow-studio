import { useState } from 'react';

export default function ContactDetails({
  contact,
  onDeleteContact,
  onEditContact,
  onAddNote,
  onDeleteNote,
}) {
  const [noteText, setNoteText] = useState('');
  if (!contact) {
    return (
      <section>
        <h2>Contact Details</h2>
        <p>Select a contact to view details.</p>
      </section>
    );
  }
  function handleSubmitNote(e) {
    e.preventDefault();

    if (noteText.trim() === '') {
      return;
    }

    onAddNote(contact.id, noteText.trim());
    setNoteText('');
  }
  return (
    <section className="contact-details">
      <h2>Contact Details</h2>

      <h3>{contact.name}</h3>
      <p>{contact.company}</p>
      <p>{contact.email}</p>
      <p>{contact.status}</p>
      <button onClick={() => onEditContact(contact.id)}>Edit</button>
      <button onClick={() => onDeleteContact(contact.id)}>
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

      {(!contact.notes || contact.notes.length === 0) && (
        <p>No notes yet.</p>
      )}

      {contact.notes?.map((note) => {
        const formattedDate = note.createdAt
          ? new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(note.createdAt))
          : 'No date';

        return (
          <div key={note.id} className="note-item">
            <p>{note.text}</p>
            <small>Added: {formattedDate}</small>
            <button onClick={() => onDeleteNote(contact.id, note.id)}>
              Delete Note
            </button>
          </div>
        );
      })}
    </section>
  );
}
