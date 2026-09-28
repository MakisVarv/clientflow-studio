import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Save } from 'lucide-react';

import { useCompanies } from '../../companies/hooks/useCompanies';

const contactSchema = z.object({
  company_id: z.string().min(1, 'Company is required'),

  first_name: z.string().trim().min(1, 'First name is required'),

  last_name: z.string().trim().min(1, 'Last name is required'),

  email: z.union([
    z.literal(''),
    z.string().email('Invalid email address'),
  ]),

  phone: z.string(),

  mobile: z.string(),

  position: z.string(),

  department: z.string(),

  is_primary: z.boolean(),

  is_active: z.boolean(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

type ContactFormProps = {
  initialValues?: Partial<ContactFormData>;

  onSubmit: (data: ContactFormData) => void;

  onCancel: () => void;

  isPending?: boolean;

  showActive?: boolean;

  disableCompany?: boolean;

  submitLabel?: string;
};

const defaultValues: ContactFormData = {
  company_id: '',

  first_name: '',

  last_name: '',

  email: '',

  phone: '',

  mobile: '',

  position: '',

  department: '',

  is_primary: false,

  is_active: true,
};

function ContactForm({
  initialValues,
  onSubmit,
  onCancel,
  isPending = false,
  showActive = false,
  disableCompany = false,
  submitLabel = 'Save',
}: ContactFormProps) {
  const { data: companies, isLoading: companiesLoading } =
    useCompanies();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),

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
        {/* COMPANY */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company *
          </label>

          <select
            {...register('company_id')}
            disabled={companiesLoading || disableCompany}
            className="
                            w-full
                            rounded-lg
                            border border-slate-300
                            px-4 py-2
                            disabled:bg-slate-100
                        "
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

        {/* FIRST NAME */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            First Name *
          </label>

          <input
            {...register('first_name')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.first_name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* LAST NAME */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Last Name *
          </label>

          <input
            {...register('last_name')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />

          {errors.last_name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.last_name.message}
            </p>
          )}
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

        {/* MOBILE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Mobile
          </label>

          <input
            {...register('mobile')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* POSITION */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Position
          </label>

          <input
            {...register('position')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* DEPARTMENT */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Department
          </label>

          <input
            {...register('department')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* PRIMARY */}

        <div className="col-span-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('is_primary')}
              className="h-4 w-4"
            />

            <span className="text-sm font-medium text-slate-700">
              Primary Contact
            </span>
          </label>
        </div>

        {/* ACTIVE - UPDATE ONLY */}

        {showActive && (
          <div className="col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('is_active')}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-slate-700">
                Active Contact
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="
                        rounded-lg
                        border border-slate-300
                        px-5 py-2
                        text-slate-700
                        hover:bg-slate-50
                    "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="
                        flex items-center gap-2
                        rounded-lg
                        bg-blue-600
                        px-5 py-2
                        text-white
                        hover:bg-blue-700
                        disabled:opacity-50
                    "
        >
          <Save size={18} />

          {isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
