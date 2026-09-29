import { useNavigate } from 'react-router-dom';

import { Plus } from 'lucide-react';

import useLeads from '../hooks/useLeads';

import LeadsTable from '../components/LeadsTable';

function LeadsPage() {
  const navigate = useNavigate();

  const { data: leads, isLoading, isError } = useLeads();

  if (isLoading) {
    return <div className="text-slate-500">Loading leads...</div>;
  }

  if (isError) {
    return <div className="text-red-600">Failed to load leads.</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Leads</h1>

          <p className="mt-2 text-slate-500">
            Manage sales opportunities and potential customers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/leads/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      <LeadsTable leads={leads ?? []} />
    </div>
  );
}

export default LeadsPage;
