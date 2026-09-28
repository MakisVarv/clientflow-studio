import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Save } from 'lucide-react';

const companySchema = z.object({
  name: z.string().trim().min(1, 'Company name is required'),

  vat_number: z.string(),

  email: z.union([
    z.literal(''),
    z.string().email('Invalid email address'),
  ]),

  phone: z.string(),

  website: z.string(),

  industry: z.string(),

  employees_count: z
    .string()
    .refine(
      (value) =>
        value === '' ||
        (!Number.isNaN(Number(value)) && Number(value) >= 0),
      'Employees count must be a valid number',
    ),

  country: z.string(),

  city: z.string(),

  address: z.string(),

  postal_code: z.string(),

  description: z.string(),

  is_active: z.boolean(),
});

export type CompanyFormData = z.infer<typeof companySchema>;

type CompanyFormProps = {
  initialValues?: Partial<CompanyFormData>;

  onSubmit: (data: CompanyFormData) => void;

  onCancel: () => void;

  isPending?: boolean;

  showActive?: boolean;

  submitLabel?: string;
};

const defaultValues: CompanyFormData = {
  name: '',

  vat_number: '',

  email: '',

  phone: '',

  website: '',

  industry: '',

  employees_count: '',

  country: '',

  city: '',

  address: '',

  postal_code: '',

  description: '',

  is_active: true,
};

function CompanyForm({
  initialValues,
  onSubmit,
  onCancel,
  isPending = false,
  showActive = false,
  submitLabel = 'Save',
}: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),

    defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
      ...initialValues,
    });
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <div className="grid grid-cols-2 gap-6">
        {/* NAME */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company Name *
          </label>

          <input
            {...register('name')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* VAT */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            VAT Number
          </label>

          <input
            {...register('vat_number')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* INDUSTRY */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Industry
          </label>

          <input
            {...register('industry')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* EMAIL */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            {...register('email')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PHONE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone
          </label>

          <input
            {...register('phone')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* WEBSITE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Website
          </label>

          <input
            {...register('website')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* EMPLOYEES */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Employees Count
          </label>

          <input
            type="number"
            min="0"
            {...register('employees_count')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.employees_count && (
            <p className="mt-1 text-sm text-red-500">
              {errors.employees_count.message}
            </p>
          )}
        </div>

        {/* COUNTRY */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Country
          </label>

          <input
            {...register('country')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* CITY */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            City
          </label>

          <input
            {...register('city')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* ADDRESS */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Address
          </label>

          <input
            {...register('address')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* POSTAL CODE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Postal Code
          </label>

          <input
            {...register('postal_code')}
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

        {/* ACTIVE - ONLY UPDATE */}

        {showActive && (
          <div className="col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('is_active')}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-slate-700">
                Active Company
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

export default CompanyForm;
