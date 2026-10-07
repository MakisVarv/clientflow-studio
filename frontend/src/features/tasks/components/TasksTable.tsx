import { useNavigate } from 'react-router-dom';

import { Pencil, Trash2 } from 'lucide-react';

import type { Task } from '../types/task.types';

import useDeleteTask from '../hooks/useDeleteTask';

type TasksTableProps = {
  tasks: Task[];
};

function TasksTable({ tasks }: TasksTableProps) {
  const navigate = useNavigate();

  const deleteTask = useDeleteTask();

  function handleDelete(task: Task) {
    const confirmed = window.confirm(`Delete task "${task.title}"?`);

    if (!confirmed) {
      return;
    }

    deleteTask.mutate(task.id);
  }

  function getStatusClass(status: string) {
    switch (status) {
      case 'TODO':
        return 'bg-slate-100 text-slate-700';

      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700';

      case 'COMPLETED':
        return 'bg-green-100 text-green-700';

      case 'CANCELLED':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  function getPriorityClass(priority: string) {
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

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        No tasks found.
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
                Task
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Priority
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Due Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Completed
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-800">
                    {task.title}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {task.description || 'No description'}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                      task.status,
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityClass(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : '-'}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      task.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.completed ? 'Yes' : 'No'}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/tasks/${task.id}/edit`)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(task)}
                      disabled={deleteTask.isPending}
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

export default TasksTable;
