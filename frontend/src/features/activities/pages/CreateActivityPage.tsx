import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import ActivityForm, {
  type ActivityFormData,
} from '../components/ActivityForm';

import useCreateActivity from '../hooks/useCreateActivity';

import type { CreateActivityRequest } from '../types/activity.types';

function CreateActivityPage() {
  const navigate = useNavigate();

  const createActivity = useCreateActivity();

  function handleSubmit(data: ActivityFormData) {
    const payload: CreateActivityRequest = {
      company_id: data.company_id,

      contact_id: data.contact_id || null,

      lead_id: data.lead_id || null,

      deal_id: data.deal_id || null,

      owner_id: data.owner_id,

      type: data.type,

      subject: data.subject,

      description: data.description || null,
    };

    createActivity.mutate(payload, {
      onSuccess: () => {
        navigate('/activities');
      },

      onError: (error) => {
        console.error('CREATE ACTIVITY ERROR:', error);
      },
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/activities')}
        className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={18} />
        Back to Activities
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Add Activity
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new CRM activity.
        </p>
      </div>

      <ActivityForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/activities')}
        isPending={createActivity.isPending}
        submitLabel="Save Activity"
      />
    </div>
  );
}

export default CreateActivityPage;
