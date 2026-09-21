import { Pencil, Trash2 } from 'lucide-react';

const permissions = [
  {
    id: 1,
    name: 'users.read',
    description: 'View users',
  },
  {
    id: 2,
    name: 'users.create',
    description: 'Create users',
  },
  {
    id: 3,
    name: 'companies.read',
    description: 'View companies',
  },
  {
    id: 4,
    name: 'companies.create',
    description: 'Create companies',
  },
  {
    id: 5,
    name: 'deals.update',
    description: 'Update deals',
  },
  {
    id: 6,
    name: 'reports.read',
    description: 'View reports',
  },
];

function PermissionsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Permission
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Description
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {permissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {permission.name}
                </span>
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {permission.description}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600">
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

export default PermissionsTable;
