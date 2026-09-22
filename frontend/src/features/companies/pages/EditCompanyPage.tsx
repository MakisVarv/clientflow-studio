import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { ArrowLeft, Save } from 'lucide-react';

import useUpdateCompany from '../hooks/useUpdateCompany';

import type { UpdateCompanyRequest } from '../types/company.types';
import { useCompany } from '../hooks/useCompanies';

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

function EditCompanyPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: company, isLoading, isError } = useCompany(id ?? '');

  const updateCompany = useUpdateCompany();

  const {
    register,
    handleSubmit,
    reset,
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

  useEffect(() => {
    if (!company) {
      return;
    }

    reset({
      name: company.name,

      vat_number: company.vat_number ?? '',

      email: company.email ?? '',

      phone: company.phone ?? '',

      website: company.website ?? '',

      industry: company.industry ?? '',

      employees_count:
        company.employees_count !== null
          ? String(company.employees_count)
          : '',

      country: company.country ?? '',

      city: company.city ?? '',

      address: company.address ?? '',

      postal_code: company.postal_code ?? '',

      description: company.description ?? '',

      is_active: company.is_active,
    });
  }, [company, reset]);

  function onSubmit(data: CompanyFormData) {
    if (!id) {
      return;
    }

    const payload: UpdateCompanyRequest = {
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

      is_active: data.is_active,
    };

    updateCompany.mutate(
      {
        id,
        data: payload,
      },
      {
        onSuccess: () => {
          navigate('/companies');
        },
      },
    );
  }

  if (isLoading) {
    return <div className="text-slate-500">Loading company...</div>;
  }

  if (isError || !company) {
    return (
      <div className="text-red-600">Failed to load company.</div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate('/companies')}
          className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={18} />
          Back to Companies
        </button>

        <h1 className="text-3xl font-bold text-slate-800">
          Edit Company
        </h1>

        <p className="mt-2 text-slate-500">
          Update company information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-slate-200 bg-white p-6"
      >
        <div className="grid grid-cols-2 gap-6">
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

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              VAT Number
            </label>

            <input
              {...register('vat_number')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Industry
            </label>

            <input
              {...register('industry')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              {...register('phone')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Website
            </label>

            <input
              {...register('website')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

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
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Country
            </label>

            <input
              {...register('country')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              City
            </label>

            <input
              {...register('city')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Address
            </label>

            <input
              {...register('address')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Postal Code
            </label>

            <input
              {...register('postal_code')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>

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
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/companies')}
            className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateCompany.isPending}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />

            {updateCompany.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCompanyPage;
