import ContactCard from './ContactCard';

export default function ContactList({
  contacts,
  totalContacts,
  selectedContactId,
  onSelectContact,
}) {
  return (
    <div className="contact-list">
      {contacts.length === 0 && <p>No Contacts found</p>}
      <p>
        {contacts.length} contacts out of {totalContacts.length}{' '}
        found.
      </p>

      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onSelectContact={onSelectContact}
          isSelected={contact.id === selectedContactId}
        />
      ))}
    </div>
  );
}
