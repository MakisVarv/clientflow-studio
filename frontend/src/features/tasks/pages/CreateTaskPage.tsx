import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import TaskForm, { type TaskFormData } from '../components/TaskForm';

import useCreateTask from '../hooks/useCreateTask';

import type {
  CreateTaskRequest,
  TaskPriority,
} from '../types/task.types';

function CreateTaskPage() {
  const navigate = useNavigate();

  const createTask = useCreateTask();

  function handleSubmit(data: TaskFormData) {
    const payload: CreateTaskRequest = {
      company_id: data.company_id,

      contact_id: data.contact_id || null,

      lead_id: data.lead_id || null,

      deal_id: data.deal_id || null,

      owner_id: data.owner_id,

      title: data.title,

      description: data.description || null,

      due_date: data.due_date || null,

      priority: data.priority as TaskPriority,
    };

    createTask.mutate(payload, {
      onSuccess: () => {
        navigate('/tasks');
      },

      onError: (error) => {
        console.error('CREATE TASK ERROR:', error);
      },
    });
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
          Add Task
        </h1>

        <p className="mt-2 text-slate-500">Create a new CRM task.</p>
      </div>

      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/tasks')}
        isPending={createTask.isPending}
        submitLabel="Save Task"
      />
    </div>
  );
}

export default CreateTaskPage;
