import { useNavigate } from 'react-router-dom';

import { Pencil, Trash2 } from 'lucide-react';

import type { Company } from '../types/company.types';
import useDeleteCompany from '../hooks/useDeleteCompany';

type CompaniesTableProps = {
  companies: Company[];
};
function CompaniesTable({ companies }: CompaniesTableProps) {
  const navigate = useNavigate();
  const deleteCompany = useDeleteCompany();

  function handleDelete(company: Company) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${company.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    deleteCompany.mutate(company.id, {
      onError: (error) => {
        console.error('DELETE COMPANY ERROR:', error);
      },
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Company
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Phone
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              City
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Status
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800">
                  {company.name}
                </div>

                <div className="text-sm text-slate-500">
                  {company.industry || 'No industry'}
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {company.email || '-'}
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {company.phone || '-'}
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {company.city || '-'}
              </td>

              <td className="px-6 py-4">
                {company.is_active ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Inactive
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/companies/${company.id}/edit`)
                    }
                    className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(company)}
                    disabled={deleteCompany.isPending}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
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
  );
}

export default CompaniesTable;
