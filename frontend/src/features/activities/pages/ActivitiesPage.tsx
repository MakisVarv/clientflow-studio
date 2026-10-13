import { useNavigate } from 'react-router-dom';

import { Plus } from 'lucide-react';

import useActivities from '../hooks/useActivities';

import ActivitiesTable from '../components/ActivitiesTable';

function ActivitiesPage() {
  const navigate = useNavigate();

  const { data: activities, isLoading, isError } = useActivities();

  if (isLoading) {
    return (
      <div className="text-slate-500">Loading activities...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600">Failed to load activities.</div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Activities
          </h1>

          <p className="mt-2 text-slate-500">
            Manage CRM customer interactions and activities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/activities/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Activity
        </button>
      </div>

      <ActivitiesTable activities={activities ?? []} />
    </div>
  );
}

export default ActivitiesPage;
