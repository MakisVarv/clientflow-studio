import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Save } from 'lucide-react';

import useCompanies from '../../companies/hooks/useCompanies';
import useContacts from '../../contacts/hooks/useContacts';
import useLeads from '../../leads/hooks/useLeads';
import useDeals from '../../deals/hooks/useDeals';
import useUsers from '../../users/hooks/useUsers';

const taskSchema = z.object({
  company_id: z.string().min(1, 'Company is required'),

  contact_id: z.string(),

  lead_id: z.string(),

  deal_id: z.string(),

  owner_id: z.string().min(1, 'Owner is required'),

  title: z
    .string()
    .trim()
    .min(3, 'Title must contain at least 3 characters'),

  description: z.string(),

  due_date: z.string(),

  completed_at: z.string(),

  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),

  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),

  completed: z.boolean(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

type TaskFormProps = {
  initialValues?: Partial<TaskFormData>;

  onSubmit: (data: TaskFormData) => void;

  onCancel: () => void;

  isPending?: boolean;

  disableRelations?: boolean;

  showEditFields?: boolean;

  submitLabel?: string;
};

const defaultValues: TaskFormData = {
  company_id: '',

  contact_id: '',

  lead_id: '',

  deal_id: '',

  owner_id: '',

  title: '',

  description: '',

  due_date: '',

  completed_at: '',

  status: 'TODO',

  priority: 'MEDIUM',

  completed: false,
};

function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  isPending = false,
  disableRelations = false,
  showEditFields = false,
  submitLabel = 'Save',
}: TaskFormProps) {
  const { data: companies } = useCompanies();

  const { data: contacts } = useContacts();

  const { data: leads } = useLeads();

  const { data: deals } = useDeals();

  const { data: users } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),

    defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
      ...initialValues,
    });
  }, [initialValues, reset]);
  useEffect(() => {
    if (initialValues?.company_id && companies?.length) {
      setValue('company_id', initialValues.company_id);
    }
  }, [companies, initialValues?.company_id, setValue]);

  useEffect(() => {
    if (initialValues?.contact_id && contacts?.length) {
      setValue('contact_id', initialValues.contact_id);
    }
  }, [contacts, initialValues?.contact_id, setValue]);

  useEffect(() => {
    if (initialValues?.lead_id && leads?.length) {
      setValue('lead_id', initialValues.lead_id);
    }
  }, [leads, initialValues?.lead_id, setValue]);

  useEffect(() => {
    if (initialValues?.deal_id && deals?.length) {
      setValue('deal_id', initialValues.deal_id);
    }
  }, [deals, initialValues?.deal_id, setValue]);

  useEffect(() => {
    if (initialValues?.owner_id && users?.length) {
      setValue('owner_id', initialValues.owner_id);
    }
  }, [users, initialValues?.owner_id, setValue]);

  const selectedCompanyId = watch('company_id');

  const filteredContacts =
    contacts?.filter(
      (contact) =>
        String(contact.company_id) === String(selectedCompanyId),
    ) ?? [];

  const filteredLeads =
    leads?.filter(
      (lead) => String(lead.company_id) === String(selectedCompanyId),
    ) ?? [];

  const filteredDeals =
    deals?.filter(
      (deal) => String(deal.company_id) === String(selectedCompanyId),
    ) ?? [];

  useEffect(() => {
    if (!disableRelations) {
      setValue('contact_id', '');

      setValue('lead_id', '');

      setValue('deal_id', '');
    }
  }, [selectedCompanyId, disableRelations, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <div className="grid grid-cols-2 gap-6">
        {/* COMPANY */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company *
          </label>

          <select
            {...register('company_id')}
            disabled={disableRelations}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          >
            <option value="">Select Company</option>

            {companies?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          {errors.company_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.company_id.message}
            </p>
          )}
        </div>

        {/* OWNER */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Owner *
          </label>

          <select
            {...register('owner_id')}
            disabled={disableRelations}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          >
            <option value="">Select Owner</option>

            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
                {' - '}
                {user.email}
              </option>
            ))}
          </select>

          {errors.owner_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.owner_id.message}
            </p>
          )}
        </div>

        {/* CONTACT */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Contact
          </label>

          <select
            {...register('contact_id')}
            disabled={!selectedCompanyId || disableRelations}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          >
            <option value="">No Contact</option>

            {filteredContacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.first_name} {contact.last_name}
              </option>
            ))}
          </select>
        </div>

        {/* LEAD */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Lead
          </label>

          <select
            {...register('lead_id')}
            disabled={!selectedCompanyId || disableRelations}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          >
            <option value="">No Lead</option>

            {filteredLeads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.title}
              </option>
            ))}
          </select>
        </div>

        {/* DEAL */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Deal
          </label>

          <select
            {...register('deal_id')}
            disabled={!selectedCompanyId}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          >
            <option value="">No Deal</option>

            {filteredDeals.map((deal) => (
              <option key={deal.id} value={deal.id}>
                {deal.title}
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Title *
          </label>

          <input
            {...register('title')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* DUE DATE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Due Date
          </label>

          <input
            type="date"
            {...register('due_date')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* PRIORITY */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Priority
          </label>

          <select
            {...register('priority')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          >
            <option value="LOW">Low</option>

            <option value="MEDIUM">Medium</option>

            <option value="HIGH">High</option>

            <option value="URGENT">Urgent</option>
          </select>
        </div>

        {/* STATUS - EDIT */}

        {showEditFields && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              {...register('status')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            >
              <option value="TODO">To Do</option>

              <option value="IN_PROGRESS">In Progress</option>

              <option value="COMPLETED">Completed</option>

              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        )}

        {/* COMPLETED AT */}

        {showEditFields && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Completed At
            </label>

            <input
              type="date"
              {...register('completed_at')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
        )}

        {/* DESCRIPTION */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={4}
            {...register('description')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* COMPLETED */}

        {showEditFields && (
          <div className="col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('completed')}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-slate-700">
                Completed
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={18} />

          {isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
