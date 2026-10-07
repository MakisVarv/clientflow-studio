import { useNavigate } from 'react-router-dom';

import { Pencil, Trash2 } from 'lucide-react';

import type { Deal } from '../types/deal.types';

import useDeleteDeal from '../hooks/useDeleteDeal';

type DealsTableProps = {
  deals: Deal[];
};

function DealsTable({ deals }: DealsTableProps) {
  const navigate = useNavigate();

  const deleteDeal = useDeleteDeal();

  function handleDelete(deal: Deal) {
    const confirmed = window.confirm(`Delete deal "${deal.title}"?`);

    if (!confirmed) {
      return;
    }

    deleteDeal.mutate(deal.id);
  }

  function getStageClass(stage: string) {
    switch (stage) {
      case 'NEW':
        return 'bg-slate-100 text-slate-700';

      case 'QUALIFICATION':
        return 'bg-blue-100 text-blue-700';

      case 'PROPOSAL':
        return 'bg-purple-100 text-purple-700';

      case 'NEGOTIATION':
        return 'bg-amber-100 text-amber-700';

      case 'CONTRACT':
        return 'bg-indigo-100 text-indigo-700';

      case 'WON':
        return 'bg-green-100 text-green-700';

      case 'LOST':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  if (deals.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        No deals found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Deal
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Stage
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Value
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Probability
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Expected Close
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-800">
                    {deal.title}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStageClass(
                      deal.stage,
                    )}`}
                  >
                    {deal.stage}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  €{Number(deal.value).toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {deal.probability}%
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {deal.expected_close_date
                    ? new Date(
                        deal.expected_close_date,
                      ).toLocaleDateString()
                    : '-'}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      deal.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {deal.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/deals/${deal.id}/edit`)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(deal)}
                      disabled={deleteDeal.isPending}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DealsTable;
