import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import LeadForm, { type LeadFormData } from '../components/LeadForm';

import useLeads from '../hooks/useLeads';
import useUpdateLead from '../hooks/useUpdateLead';

import type { UpdateLeadRequest } from '../types/lead.types';

function EditLeadPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: lead, isLoading, isError } = useLeads(id ?? '');

  const updateLead = useUpdateLead();

  if (isLoading) {
    return <div className="text-slate-500">Loading lead...</div>;
  }

  if (isError || !lead || !id) {
    return <div className="text-red-600">Failed to load lead.</div>;
  }

  const initialValues: LeadFormData = {
    company_id: lead.company_id,

    contact_id: lead.contact_id,

    owner_id: lead.owner_id,

    title: lead.title,

    description: lead.description ?? '',

    source: lead.source ?? '',

    status: lead.status ?? '',

    priority: lead.priority ?? '',

    estimated_value: lead.estimated_value ?? '',

    probability:
      lead.probability !== null ? String(lead.probability) : '',

    expected_close_date: lead.expected_close_date ?? '',

    is_active: lead.is_active,
  };

  function handleSubmit(data: LeadFormData) {
    if (!id) {
      return;
    }

    const payload: UpdateLeadRequest = {
      title: data.title,

      description: data.description || null,

      source: data.source || null,

      status: data.status || null,

      priority: data.priority || null,

      estimated_value: data.estimated_value
        ? Number(data.estimated_value)
        : null,

      probability: data.probability ? Number(data.probability) : null,

      is_active: data.is_active,
    };

    if (data.expected_close_date) {
      payload.expected_close_date = data.expected_close_date;
    }

    updateLead.mutate(
      {
        id,
        data: payload,
      },
      {
        onSuccess: () => {
          navigate('/leads');
        },

        onError: (error) => {
          console.error('UPDATE LEAD ERROR:', error);
        },
      },
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/leads')}
        className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={18} />
        Back to Leads
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Edit Lead
        </h1>

        <p className="mt-2 text-slate-500">Update {lead.title}.</p>
      </div>

      <LeadForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/leads')}
        isPending={updateLead.isPending}
        disableRelations
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditLeadPage;
