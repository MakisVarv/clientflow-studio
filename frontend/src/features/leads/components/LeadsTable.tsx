import { useNavigate } from 'react-router-dom';

import { Pencil, Trash2 } from 'lucide-react';

import type { Lead } from '../types/lead.types';

import useDeleteLead from '../hooks/useDeleteLead';

type LeadsTableProps = {
  leads: Lead[];
};

function LeadsTable({ leads }: LeadsTableProps) {
  const navigate = useNavigate();

  const deleteLead = useDeleteLead();

  function handleDelete(lead: Lead) {
    const confirmed = window.confirm(`Delete lead "${lead.title}"?`);

    if (!confirmed) {
      return;
    }

    deleteLead.mutate(lead.id);
  }

  function getStatusClass(status: string | null) {
    switch (status) {
      case 'NEW':
        return 'bg-slate-100 text-slate-700';

      case 'CONTACTED':
        return 'bg-blue-100 text-blue-700';

      case 'QUALIFIED':
        return 'bg-cyan-100 text-cyan-700';

      case 'PROPOSAL':
        return 'bg-purple-100 text-purple-700';

      case 'NEGOTIATION':
        return 'bg-amber-100 text-amber-700';

      case 'WON':
        return 'bg-green-100 text-green-700';

      case 'LOST':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  function getPriorityClass(priority: string | null) {
    switch (priority) {
      case 'LOW':
        return 'bg-slate-100 text-slate-600';

      case 'MEDIUM':
        return 'bg-blue-100 text-blue-700';

      case 'HIGH':
        return 'bg-orange-100 text-orange-700';

      case 'URGENT':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        No leads found.
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
                Lead
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Value
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Probability
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Close Date
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-800">
                    {lead.title}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {lead.source || 'No source'}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                      lead.status,
                    )}`}
                  >
                    {lead.status || 'N/A'}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityClass(
                      lead.priority,
                    )}`}
                  >
                    {lead.priority || 'N/A'}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {lead.estimated_value
                    ? `€${Number(
                        lead.estimated_value,
                      ).toLocaleString()}`
                    : '-'}
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {lead.probability !== null
                    ? `${lead.probability}%`
                    : '-'}
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {lead.expected_close_date
                    ? new Date(
                        lead.expected_close_date,
                      ).toLocaleDateString()
                    : '-'}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/leads/${lead.id}/edit`)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(lead)}
                      disabled={deleteLead.isPending}
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

export default LeadsTable;
