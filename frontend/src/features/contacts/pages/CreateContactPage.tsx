import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import ContactForm, {
  type ContactFormData,
} from '../components/ContactForm';

import useCreateContact from '../hooks/useCreateContact';

import type { CreateContactRequest } from '../types/contact.types';

function CreateContactPage() {
  const navigate = useNavigate();

  const createContact = useCreateContact();

  function handleSubmit(data: ContactFormData) {
    const payload: CreateContactRequest = {
      company_id: data.company_id,

      first_name: data.first_name,

      last_name: data.last_name,

      email: data.email || null,

      phone: data.phone || null,

      mobile: data.mobile || null,

      position: data.position || null,

      department: data.department || null,

      is_primary: data.is_primary,
    };

    createContact.mutate(payload, {
      onSuccess: () => {
        navigate('/contacts');
      },

      onError: (error) => {
        console.error('CREATE CONTACT ERROR:', error);
      },
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/contacts')}
        className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={18} />
        Back to Contacts
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Add Contact
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new CRM contact.
        </p>
      </div>

      <ContactForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/contacts')}
        isPending={createContact.isPending}
        submitLabel="Save Contact"
      />
    </div>
  );
}

export default CreateContactPage;
