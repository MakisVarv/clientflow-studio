import { useNavigate } from 'react-router-dom';

import { Plus } from 'lucide-react';

import useContacts from '../hooks/useContacts';

import ContactsTable from '../components/ContactsTable';

function ContactsPage() {
  const navigate = useNavigate();

  const { data: contacts, isLoading, isError } = useContacts();

  if (isLoading) {
    return <div className="text-slate-500">Loading contacts...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-600">Failed to load contacts.</div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Contacts
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your CRM contacts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/contacts/new')}
          className="
                        flex items-center gap-2
                        rounded-lg
                        bg-blue-600
                        px-4 py-2
                        text-white
                        hover:bg-blue-700
                    "
        >
          <Plus size={18} />
          Add Contact
        </button>
      </div>

      <ContactsTable contacts={contacts ?? []} />
    </div>
  );
}

export default ContactsPage;
