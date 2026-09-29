import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import LeadForm, { type LeadFormData } from '../components/LeadForm';

import useCreateLead from '../hooks/useCreateLead';

import type { CreateLeadRequest } from '../types/lead.types';

function CreateLeadPage() {
  const navigate = useNavigate();

  const createLead = useCreateLead();

  function handleSubmit(data: LeadFormData) {
    const payload: CreateLeadRequest = {
      company_id: data.company_id,

      contact_id: data.contact_id,

      owner_id: data.owner_id,

      title: data.title,

      description: data.description || null,

      source: data.source || null,

      status: data.status || null,

      priority: data.priority || null,

      estimated_value: data.estimated_value
        ? Number(data.estimated_value)
        : null,

      probability: data.probability ? Number(data.probability) : null,

      expected_close_date: data.expected_close_date || null,

      is_active: data.is_active,
    };

    createLead.mutate(payload, {
      onSuccess: () => {
        navigate('/leads');
      },

      onError: (error) => {
        console.error('CREATE LEAD ERROR:', error);
      },
    });
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
          Add Lead
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new sales lead.
        </p>
      </div>

      <LeadForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/leads')}
        isPending={createLead.isPending}
        submitLabel="Save Lead"
      />
    </div>
  );
}

export default CreateLeadPage;
