import { useNavigate } from 'react-router-dom';

import { Plus } from 'lucide-react';

import CompaniesTable from '../components/CompaniesTable';
import { useCompanies } from '../hooks/useCompanies';

function CompaniesPage() {
  const navigate = useNavigate();

  const { data: companies, isLoading, isError } = useCompanies();

  if (isLoading) {
    return <div>Loading companies...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-600">Failed to load companies.</div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Companies
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your CRM companies.
          </p>
        </div>

        <button
          onClick={() => navigate('/companies/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Company
        </button>
      </div>

      <CompaniesTable companies={companies ?? []} />
    </div>
  );
}

export default CompaniesPage;
