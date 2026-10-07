import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Save } from 'lucide-react';

import useCompanies from '../../companies/hooks/useCompanies';
import useLeads from '../../leads/hooks/useLeads';
import useUsers from '../../users/hooks/useUsers';

const dealSchema = z.object({
  company_id: z.string().min(1, 'Company is required'),

  lead_id: z.string().min(1, 'Lead is required'),

  owner_id: z.string().min(1, 'Owner is required'),

  title: z
    .string()
    .trim()
    .min(3, 'Title must contain at least 3 characters'),

  value: z.string().min(1, 'Value is required'),

  stage: z.string(),

  probability: z
    .string()
    .refine(
      (value) =>
        value === '' ||
        (!Number.isNaN(Number(value)) &&
          Number(value) >= 0 &&
          Number(value) <= 100),
      'Probability must be between 0 and 100',
    ),

  expected_close_date: z.string(),

  closed_date: z.string(),

  lost_reason: z.string(),

  notes: z.string(),

  is_active: z.boolean(),
});

export type DealFormData = z.infer<typeof dealSchema>;

type DealFormProps = {
  initialValues?: Partial<DealFormData>;

  onSubmit: (data: DealFormData) => void;

  onCancel: () => void;

  isPending?: boolean;

  disableRelations?: boolean;

  showEditFields?: boolean;

  submitLabel?: string;
};

const defaultValues: DealFormData = {
  company_id: '',

  lead_id: '',

  owner_id: '',

  title: '',

  value: '',

  stage: 'NEW',

  probability: '0',

  expected_close_date: '',

  closed_date: '',

  lost_reason: '',

  notes: '',

  is_active: true,
};

function DealForm({
  initialValues,
  onSubmit,
  onCancel,
  isPending = false,
  disableRelations = false,
  showEditFields = false,
  submitLabel = 'Save',
}: DealFormProps) {
  const { data: companies } = useCompanies();

  const { data: leads } = useLeads();

  const { data: users } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),

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
    if (initialValues?.lead_id && leads?.length) {
      setValue('lead_id', initialValues.lead_id);
    }
  }, [leads, initialValues?.lead_id, setValue]);

  useEffect(() => {
    if (initialValues?.owner_id && users?.length) {
      setValue('owner_id', initialValues.owner_id);
    }
  }, [users, initialValues?.owner_id, setValue]);

  const selectedCompanyId = watch('company_id');

  const selectedStage = watch('stage');

  const filteredLeads =
    leads?.filter(
      (lead) => String(lead.company_id) === String(selectedCompanyId),
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

        {/* LEAD */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Lead *
          </label>

          <select
            {...register('lead_id')}
            disabled={!selectedCompanyId || disableRelations}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          >
            <option value="">Select Lead</option>

            {filteredLeads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.title}
              </option>
            ))}
          </select>

          {errors.lead_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lead_id.message}
            </p>
          )}
        </div>

        {/* OWNER */}

        <div className="col-span-2">
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

        {/* VALUE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Deal Value *
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            {...register('value')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.value && (
            <p className="mt-1 text-sm text-red-500">
              {errors.value.message}
            </p>
          )}
        </div>

        {/* PROBABILITY */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Probability %
          </label>

          <input
            type="number"
            min="0"
            max="100"
            {...register('probability')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.probability && (
            <p className="mt-1 text-sm text-red-500">
              {errors.probability.message}
            </p>
          )}
        </div>

        {/* EXPECTED CLOSE DATE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Expected Close Date
          </label>

          <input
            type="date"
            {...register('expected_close_date')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* STAGE - EDIT ONLY */}

        {showEditFields && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Stage
            </label>

            <select
              {...register('stage')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            >
              <option value="NEW">New</option>

              <option value="QUALIFICATION">Qualification</option>

              <option value="PROPOSAL">Proposal</option>

              <option value="NEGOTIATION">Negotiation</option>

              <option value="CONTRACT">Contract</option>

              <option value="WON">Won</option>

              <option value="LOST">Lost</option>
            </select>
          </div>
        )}

        {/* CLOSED DATE */}

        {showEditFields && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Closed Date
            </label>

            <input
              type="date"
              {...register('closed_date')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
        )}

        {/* LOST REASON */}

        {showEditFields && selectedStage === 'LOST' && (
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Lost Reason
            </label>

            <textarea
              rows={3}
              {...register('lost_reason')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
        )}

        {/* NOTES */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Notes
          </label>

          <textarea
            rows={4}
            {...register('notes')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* ACTIVE - EDIT ONLY */}

        {showEditFields && (
          <div className="col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('is_active')}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-slate-700">
                Active Deal
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

export default DealForm;
