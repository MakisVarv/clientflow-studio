import { useNavigate } from 'react-router-dom';

import { Plus } from 'lucide-react';

import useTasks from '../hooks/useTasks';

import TasksTable from '../components/TasksTable';

function TasksPage() {
  const navigate = useNavigate();

  const { data: tasks, isLoading, isError } = useTasks();

  if (isLoading) {
    return <div className="text-slate-500">Loading tasks...</div>;
  }

  if (isError) {
    return <div className="text-red-600">Failed to load tasks.</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Tasks</h1>

          <p className="mt-2 text-slate-500">
            Manage CRM tasks and follow-up activities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/tasks/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <TasksTable tasks={tasks ?? []} />
    </div>
  );
}

export default TasksPage;
