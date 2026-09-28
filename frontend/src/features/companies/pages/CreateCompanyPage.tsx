import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import CompanyForm, {
  type CompanyFormData,
} from '../components/CompanyForm';

import useCreateCompany from '../hooks/useCreateCompany';

import type { CreateCompanyRequest } from '../types/company.types';

function CreateCompanyPage() {
  const navigate = useNavigate();

  const createCompany = useCreateCompany();

  function handleSubmit(data: CompanyFormData) {
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
      <button
        type="button"
        onClick={() => navigate('/companies')}
        className="mb-3 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={18} />
        Back to Companies
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Add Company
        </h1>

        <p className="mt-2 text-slate-500">Create a new company.</p>
      </div>

      <CompanyForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/companies')}
        isPending={createCompany.isPending}
        submitLabel="Save Company"
      />
    </div>
  );
}

export default CreateCompanyPage;
