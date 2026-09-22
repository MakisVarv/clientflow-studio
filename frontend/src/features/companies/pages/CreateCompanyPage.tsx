import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { ArrowLeft, Save } from 'lucide-react';

import useCreateCompany from '../hooks/useCreateCompany';

import type { CreateCompanyRequest } from '../types/company.types';

const companySchema = z.object({
  name: z.string().trim().min(1, 'Company name is required'),

  vat_number: z.string().optional(),

  email: z.union([
    z.literal(''),
    z.string().email('Invalid email address'),
  ]),

  phone: z.string().optional(),

  website: z.string().optional(),

  industry: z.string().optional(),

  employees_count: z
    .string()
    .refine(
      (value) =>
        value === '' ||
        (!Number.isNaN(Number(value)) && Number(value) >= 0),
      'Employees count must be a valid number',
    )
    .optional(),

  country: z.string().optional(),

  city: z.string().optional(),

  address: z.string().optional(),

  postal_code: z.string().optional(),

  description: z.string().optional(),

  is_active: z.boolean(),
});

type CompanyFormData = z.infer<typeof companySchema>;

function CreateCompanyPage() {
  const navigate = useNavigate();

  const createCompany = useCreateCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),

    defaultValues: {
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
    },
  });

  function onSubmit(data: CompanyFormData) {
    const payload: CreateCompanyRequest = {
      name: data.name,

      vat_number: data.vat_number || null,

      email: data.email || null,

      phone: data.phone || null,

      website: data.website || null,

      industry: data.industry || null,

      employees_count: data.employees_count
        ? Number(data.employees_count)
        : null,

      country: data.country || null,

      city: data.city || null,

      address: data.address || null,

      postal_code: data.postal_code || null,

      description: data.description || null,
    };

    createCompany.mutate(payload, {
      onSuccess: () => {
        navigate('/companies');
      },
    });
  }

  return (
    <div>
      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/companies')}
            className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft size={18} />
            Back to Companies
          </button>

          <h1 className="text-3xl font-bold text-slate-800">
            Add Company
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new company in ClientFlow CRM.
          </p>
        </div>
      </div>

      {/* FORM */}

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
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* ACTIVE */}

          {/* <div className="col-span-2">
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
          </div> */}
        </div>

        {/* BUTTONS */}

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/companies')}
            className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createCompany.isPending}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />

            {createCompany.isPending ? 'Saving...' : 'Save Company'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCompanyPage;
