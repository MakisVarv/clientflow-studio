import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import DealForm, { type DealFormData } from '../components/DealForm';

import useDeals from '../hooks/useDeals';

import useUpdateDeal from '../hooks/useUpdateDeal';

import type { UpdateDealRequest } from '../types/deal.types';

function EditDealPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: deal, isLoading, isError } = useDeals(id ?? '');

  const updateDeal = useUpdateDeal();

  if (isLoading) {
    return <div className="text-slate-500">Loading deal...</div>;
  }

  if (isError || !deal || !id) {
    return <div className="text-red-600">Failed to load deal.</div>;
  }

  const initialValues: DealFormData = {
    company_id: deal.company_id,

    lead_id: deal.lead_id,

    owner_id: deal.owner_id,

    title: deal.title,

    value: deal.value ?? '',

    stage: deal.stage ?? 'NEW',

    probability:
      deal.probability !== null ? String(deal.probability) : '0',

    expected_close_date: deal.expected_close_date ?? '',

    closed_date: deal.closed_date ?? '',

    lost_reason: deal.lost_reason ?? '',

    notes: deal.notes ?? '',

    is_active: deal.is_active,
  };

  function handleSubmit(data: DealFormData) {
    if (!id) {
      return;
    }

    const payload: UpdateDealRequest = {
      title: data.title,

      value: Number(data.value),

      stage: data.stage as UpdateDealRequest['stage'],

      probability: data.probability ? Number(data.probability) : 0,

      expected_close_date: data.expected_close_date || null,

      closed_date: data.closed_date || null,

      lost_reason: data.lost_reason || null,

      notes: data.notes || null,

      is_active: data.is_active,
    };

    updateDeal.mutate(
      {
        id,
        data: payload,
      },
      {
        onSuccess: () => {
          navigate('/deals');
        },

        onError: (error) => {
          console.error('UPDATE DEAL ERROR:', error);
        },
      },
    );
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
          Edit Deal
        </h1>

        <p className="mt-2 text-slate-500">Update {deal.title}.</p>
      </div>

      <DealForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/deals')}
        isPending={updateDeal.isPending}
        disableRelations
        showEditFields
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditDealPage;
