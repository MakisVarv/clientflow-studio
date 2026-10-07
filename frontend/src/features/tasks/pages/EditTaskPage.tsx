import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import TaskForm, { type TaskFormData } from '../components/TaskForm';

import useTasks from '../hooks/useTasks';

import useUpdateTask from '../hooks/useUpdateTask';

import type { UpdateTaskRequest } from '../types/task.types';

function EditTaskPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: task, isLoading, isError } = useTasks(id ?? '');

  const updateTask = useUpdateTask();

  if (isLoading) {
    return <div className="text-slate-500">Loading task...</div>;
  }

  if (isError || !task || !id) {
    return <div className="text-red-600">Failed to load task.</div>;
  }

  const initialValues: TaskFormData = {
    company_id: task.company_id,

    contact_id: task.contact_id ?? '',

    lead_id: task.lead_id ?? '',

    deal_id: task.deal_id ?? '',

    owner_id: task.owner_id,

    title: task.title,

    description: task.description ?? '',

    due_date: task.due_date ?? '',

    completed_at: task.completed_at ?? '',

    status: task.status,

    priority: task.priority,

    completed: task.completed,
  };

  function handleSubmit(data: TaskFormData) {
    if (!id) {
      return;
    }

    const payload: UpdateTaskRequest = {
      deal_id: data.deal_id || null,
      title: data.title,

      description: data.description || null,

      due_date: data.due_date || null,

      completed_at: data.completed_at || null,

      status: data.status,

      priority: data.priority,

      completed: data.completed,
    };

    updateTask.mutate(
      {
        id,
        data: payload,
      },
      {
        onSuccess: () => {
          navigate('/tasks');
        },

        onError: (error) => {
          console.error('UPDATE TASK ERROR:', error);
        },
      },
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/tasks')}
        className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={18} />
        Back to Tasks
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Edit Task
        </h1>

        <p className="mt-2 text-slate-500">Update {task.title}.</p>
      </div>

      <TaskForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/tasks')}
        isPending={updateTask.isPending}
        disableRelations
        showEditFields
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditTaskPage;
