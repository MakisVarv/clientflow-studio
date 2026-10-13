import { useNavigate } from 'react-router-dom';

import { Pencil, Trash2 } from 'lucide-react';

import type { Activity } from '../types/activity.types';

import useDeleteActivity from '../hooks/useDeleteActivity';

type ActivitiesTableProps = {
  activities: Activity[];
};

function ActivitiesTable({ activities }: ActivitiesTableProps) {
  const navigate = useNavigate();

  const deleteActivity = useDeleteActivity();

  function handleDelete(activity: Activity) {
    const confirmed = window.confirm(
      `Delete activity "${activity.subject}"?`,
    );

    if (!confirmed) {
      return;
    }

    deleteActivity.mutate(activity.id);
  }

  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        No activities found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Subject
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Description
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Completed
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Created
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-800">
                  {activity.subject}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {activity.type}
                  </span>
                </td>

                <td className="max-w-xs truncate px-5 py-4 text-sm text-slate-600">
                  {activity.description || '-'}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activity.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {activity.completed ? 'Yes' : 'No'}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {new Date(activity.created_at).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/activities/${activity.id}/edit`)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(activity)}
                      disabled={deleteActivity.isPending}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
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

export default ActivitiesTable;
