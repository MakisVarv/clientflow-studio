import { useNavigate } from 'react-router-dom';

import { Plus } from 'lucide-react';

import useDeals from '../hooks/useDeals';

import DealsTable from '../components/DealsTable';

function DealsPage() {
  const navigate = useNavigate();

  const { data: deals, isLoading, isError } = useDeals();

  if (isLoading) {
    return <div className="text-slate-500">Loading deals...</div>;
  }

  if (isError) {
    return <div className="text-red-600">Failed to load deals.</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Deals</h1>

          <p className="mt-2 text-slate-500">
            Manage CRM sales deals and opportunities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/deals/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Deal
        </button>
      </div>

      <DealsTable deals={deals ?? []} />
    </div>
  );
}

export default DealsPage;
