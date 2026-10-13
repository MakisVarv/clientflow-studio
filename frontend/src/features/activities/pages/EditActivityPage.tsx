import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import ActivityForm, {
  type ActivityFormData,
} from '../components/ActivityForm';

import useActivities from '../hooks/useActivities';
import useUpdateActivity from '../hooks/useUpdateActivity';

import type { UpdateActivityRequest } from '../types/activity.types';

function EditActivityPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: activity,
    isLoading,
    isError,
  } = useActivities(id ?? '');

  const updateActivity = useUpdateActivity();

  if (isLoading) {
    return <div className="text-slate-500">Loading activity...</div>;
  }

  if (isError || !activity || !id) {
    return (
      <div className="text-red-600">Failed to load activity.</div>
    );
  }

  const initialValues: ActivityFormData = {
    company_id: activity.company_id,

    contact_id: activity.contact_id ?? '',

    lead_id: activity.lead_id ?? '',

    deal_id: activity.deal_id ?? '',

    owner_id: activity.owner_id,

    type: activity.type,

    subject: activity.subject,

    description: activity.description ?? '',

    completed: activity.completed,
  };

  function handleSubmit(data: ActivityFormData) {
    if (!id) {
      return;
    }

    const payload: UpdateActivityRequest = {
      type: data.type,

      subject: data.subject,

      description: data.description || null,

      completed: data.completed,
    };

    updateActivity.mutate(
      {
        id,
        data: payload,
      },
      {
        onSuccess: () => {
          navigate('/activities');
        },

        onError: (error) => {
          console.error('UPDATE ACTIVITY ERROR:', error);
        },
      },
    );
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
          Edit Activity
        </h1>

        <p className="mt-2 text-slate-500">
          Update {activity.subject}.
        </p>
      </div>

      <ActivityForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/activities')}
        isPending={updateActivity.isPending}
        disableRelations
        showCompleted
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditActivityPage;
