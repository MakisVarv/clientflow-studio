import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import CompanyForm, {
  type CompanyFormData,
} from '../components/CompanyForm';

import useCompanies from '../hooks/useCompanies';
import useUpdateCompany from '../hooks/useUpdateCompany';

import type { UpdateCompanyRequest } from '../types/company.types';

function EditCompanyPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: company,
    isLoading,
    isError,
  } = useCompanies(id ?? '');

  const updateCompany = useUpdateCompany();

  if (isLoading) {
    return <div>Loading company...</div>;
  }

  if (isError || !company || !id) {
    return (
      <div className="text-red-600">Failed to load company.</div>
    );
  }

  const initialValues: CompanyFormData = {
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
  };

  function handleSubmit(data: CompanyFormData) {
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
    if (id === undefined) return;

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
          Edit Company
        </h1>

        <p className="mt-2 text-slate-500">Update {company.name}.</p>
      </div>

      <CompanyForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/companies')}
        isPending={updateCompany.isPending}
        showActive
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditCompanyPage;
