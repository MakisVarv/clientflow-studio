import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import DealForm, { type DealFormData } from '../components/DealForm';

import useCreateDeal from '../hooks/useCreateDeal';

import type { CreateDealRequest } from '../types/deal.types';

function CreateDealPage() {
  const navigate = useNavigate();

  const createDeal = useCreateDeal();

  function handleSubmit(data: DealFormData) {
    const payload: CreateDealRequest = {
      lead_id: data.lead_id,

      company_id: data.company_id,

      owner_id: data.owner_id,

      title: data.title,

      value: Number(data.value),

      probability: data.probability ? Number(data.probability) : 0,

      expected_close_date: data.expected_close_date || null,

      notes: data.notes || null,
    };

    createDeal.mutate(payload, {
      onSuccess: () => {
        navigate('/deals');
      },

      onError: (error) => {
        console.error('CREATE DEAL ERROR:', error);
      },
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/deals')}
        className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={18} />
        Back to Deals
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Add Deal
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new sales deal.
        </p>
      </div>

      <DealForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/deals')}
        isPending={createDeal.isPending}
        submitLabel="Save Deal"
      />
    </div>
  );
}

export default CreateDealPage;
