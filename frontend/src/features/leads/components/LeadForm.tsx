import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Save } from 'lucide-react';

import useCompanies from '../../companies/hooks/useCompanies';

import useContacts from '../../contacts/hooks/useContacts';

const leadSchema = z.object({
  company_id: z.string().min(1, 'Company is required'),

  contact_id: z.string().min(1, 'Contact is required'),

  owner_id: z.string().min(1, 'Owner is required'),

  title: z.string().trim().min(1, 'Title is required'),

  description: z.string(),

  source: z.string(),

  status: z.string(),

  priority: z.string(),

  estimated_value: z.string(),

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

  is_active: z.boolean(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

type LeadFormProps = {
  initialValues?: Partial<LeadFormData>;

  onSubmit: (data: LeadFormData) => void;

  onCancel: () => void;

  isPending?: boolean;

  disableRelations?: boolean;

  submitLabel?: string;
};

const defaultValues: LeadFormData = {
  company_id: '',

  contact_id: '',

  owner_id: '',

  title: '',

  description: '',

  source: '',

  status: '',

  priority: '',

  estimated_value: '',

  probability: '',

  expected_close_date: '',

  is_active: true,
};

function LeadForm({
  initialValues,
  onSubmit,
  onCancel,
  isPending = false,
  disableRelations = false,
  submitLabel = 'Save',
}: LeadFormProps) {
  const { data: companies } = useCompanies();

  const { data: contacts } = useContacts();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),

    defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
      ...initialValues,
    });
  }, [initialValues, reset]);

  const selectedCompanyId = watch('company_id');

  const filteredContacts =
    contacts?.filter(
      (contact) => contact.company_id === selectedCompanyId,
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

        {/* CONTACT */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Contact *
          </label>

          <select
            {...register('contact_id')}
            disabled={!selectedCompanyId || disableRelations}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          >
            <option value="">Select Contact</option>

            {filteredContacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.first_name} {contact.last_name}
              </option>
            ))}
          </select>

          {errors.contact_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.contact_id.message}
            </p>
          )}
        </div>

        {/* OWNER */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Owner ID *
          </label>

          <input
            {...register('owner_id')}
            disabled={disableRelations}
            placeholder="User UUID"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
          />

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

        {/* SOURCE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Source
          </label>

          <select
            {...register('source')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          >
            <option value="">Select Source</option>

            <option value="WEBSITE">Website</option>

            <option value="FACEBOOK">Facebook</option>

            <option value="INSTAGRAM">Instagram</option>

            <option value="GOOGLE">Google</option>

            <option value="LINKEDIN">LinkedIn</option>

            <option value="EMAIL">Email</option>

            <option value="PHONE">Phone</option>

            <option value="REFERRAL">Referral</option>

            <option value="MANUAL">Manual</option>
          </select>
        </div>

        {/* STATUS */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            {...register('status')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          >
            <option value="">Select Status</option>

            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
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
            <option value="">Select Priority</option>

            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        {/* ESTIMATED VALUE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Estimated Value
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            {...register('estimated_value')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
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

        {/* ACTIVE */}

        <div className="col-span-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('is_active')}
              className="h-4 w-4"
            />

            <span className="text-sm font-medium text-slate-700">
              Active Lead
            </span>
          </label>
        </div>
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

export default LeadForm;
