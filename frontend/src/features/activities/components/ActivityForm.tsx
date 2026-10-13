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

const activitySchema = z.object({
  company_id: z.string().min(1, 'Company is required'),

  contact_id: z.string(),

  lead_id: z.string(),

  deal_id: z.string(),

  owner_id: z.string().min(1, 'Owner is required'),

  type: z.string().trim().min(1, 'Type is required'),

  subject: z
    .string()
    .trim()
    .min(3, 'Subject must contain at least 3 characters'),

  description: z.string(),

  completed: z.boolean(),
});

export type ActivityFormData = z.infer<typeof activitySchema>;

type ActivityFormProps = {
  initialValues?: Partial<ActivityFormData>;

  onSubmit: (data: ActivityFormData) => void;

  onCancel: () => void;

  isPending?: boolean;

  disableRelations?: boolean;

  showCompleted?: boolean;

  submitLabel?: string;
};

const defaultValues: ActivityFormData = {
  company_id: '',

  contact_id: '',

  lead_id: '',

  deal_id: '',

  owner_id: '',

  type: '',

  subject: '',

  description: '',

  completed: false,
};

function ActivityForm({
  initialValues,
  onSubmit,
  onCancel,
  isPending = false,
  disableRelations = false,
  showCompleted = false,
  submitLabel = 'Save',
}: ActivityFormProps) {
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
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),

    defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
      ...initialValues,
    });
  }, [initialValues, reset]);

  /*
   * Χρειάζονται για το Edit,
   * επειδή τα dropdown δεδομένα
   * έρχονται ασύγχρονα.
   */

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
            disabled={!selectedCompanyId || disableRelations}
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

        {/* TYPE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Type *
          </label>

          <input
            {...register('type')}
            placeholder="e.g. Call, Email, Meeting"
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.type && (
            <p className="mt-1 text-sm text-red-500">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* SUBJECT */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Subject *
          </label>

          <input
            {...register('subject')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

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

        {showCompleted && (
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

export default ActivityForm;
