import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import ContactForm, {
  type ContactFormData,
} from '../components/ContactForm';

import useContacts from '../hooks/useContacts';
import useUpdateContact from '../hooks/useUpdateContact';

import type { UpdateContactRequest } from '../types/contact.types';

function EditContactPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: contact, isLoading, isError } = useContacts(id ?? '');

  const updateContact = useUpdateContact();

  if (isLoading) {
    return <div className="text-slate-500">Loading contact...</div>;
  }

  if (isError || !contact || !id) {
    return (
      <div className="text-red-600">Failed to load contact.</div>
    );
  }

  const initialValues: ContactFormData = {
    company_id: contact.company_id,

    first_name: contact.first_name,

    last_name: contact.last_name,

    email: contact.email ?? '',

    phone: contact.phone ?? '',

    mobile: contact.mobile ?? '',

    position: contact.position ?? '',

    department: contact.department ?? '',

    is_primary: contact.is_primary,

    is_active: contact.is_active,
  };

  function handleSubmit(data: ContactFormData) {
    if (!id) {
      return;
    }

    const payload: UpdateContactRequest = {
      first_name: data.first_name,

      last_name: data.last_name,

      email: data.email || null,

      phone: data.phone || null,

      mobile: data.mobile || null,

      position: data.position || null,

      department: data.department || null,

      is_primary: data.is_primary,

      is_active: data.is_active,
    };

    updateContact.mutate(
      {
        id,
        data: payload,
      },
      {
        onSuccess: () => {
          navigate('/contacts');
        },

        onError: (error) => {
          console.error('UPDATE CONTACT ERROR:', error);
        },
      },
    );
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
          Edit Contact
        </h1>

        <p className="mt-2 text-slate-500">
          Update {contact.first_name} {contact.last_name}.
        </p>
      </div>

      <ContactForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/contacts')}
        isPending={updateContact.isPending}
        showActive
        disableCompany
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditContactPage;
