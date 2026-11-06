import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useCompanies from '../../companies/hooks/useCompanies';

import useContacts from '../../contacts/hooks/useContacts';

import useLeads from '../../leads/hooks/useLeads';

import useDeals from '../../deals/hooks/useDeals';
import useUsers from '../../users/hooks/useUsers';

import type { User } from '../../users/types/user.types';
import type { Deal } from '../../deals/types/deal.types';
import type { Lead } from '../../leads/types/lead.types';
import type { Contact } from '../../contacts/types/contact.types';
import type { Company } from '../../companies/types/company.types';

export type NoteFormData = {
  title: string;
  content: string;

  company_id: string;
  contact_id: string;
  lead_id: string;
  deal_id: string;

  owner_id: string;
};

type NoteFormProps = {
  initialValues?: Partial<NoteFormData>;

  onSubmit: (data: NoteFormData) => void;

  isSubmitting?: boolean;

  disableRelations?: boolean;
};

export default function NoteForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  disableRelations = false,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NoteFormData>({
    defaultValues: {
      title: '',
      content: '',

      company_id: '',
      contact_id: '',
      lead_id: '',
      deal_id: '',

      owner_id: '',

      ...initialValues,
    },
  });

  const { data: companies = [] } = useCompanies();

  const { data: contacts = [] } = useContacts();

  const { data: leads = [] } = useLeads();

  const { data: deals = [] } = useDeals();

  const { data: users = [] } = useUsers();

  const selectedCompanyId = watch('company_id');

  const filteredContacts = contacts.filter(
    (contact: Contact) => contact.company_id === selectedCompanyId,
  );

  const filteredLeads = leads.filter(
    (lead: Lead) => lead.company_id === selectedCompanyId,
  );

  const filteredDeals = deals.filter(
    (deal: Deal) => deal.company_id === selectedCompanyId,
  );

  useEffect(() => {
    if (initialValues?.company_id) {
      setValue('company_id', initialValues.company_id);
    }

    if (initialValues?.contact_id) {
      setValue('contact_id', initialValues.contact_id);
    }

    if (initialValues?.lead_id) {
      setValue('lead_id', initialValues.lead_id);
    }

    if (initialValues?.deal_id) {
      setValue('deal_id', initialValues.deal_id);
    }

    if (initialValues?.owner_id) {
      setValue('owner_id', initialValues.owner_id);
    }
  }, [initialValues, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        space-y-6
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
      "
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          {...register('title', {
            required: 'Title is required',
          })}
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            px-4
            py-2
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Content
        </label>

        <textarea
          {...register('content', {
            required: 'Content is required',
          })}
          rows={8}
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {errors.content && (
          <p className="mt-1 text-sm text-red-500">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company
          </label>

          <select
            {...register('company_id')}
            disabled={disableRelations}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              disabled:bg-slate-100
            "
          >
            <option value="">No company</option>

            {companies.map((company: Company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Contact
          </label>

          <select
            {...register('contact_id')}
            disabled={disableRelations || !selectedCompanyId}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              disabled:bg-slate-100
            "
          >
            <option value="">No contact</option>

            {filteredContacts.map((contact: Contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.first_name} {contact.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Lead
          </label>

          <select
            {...register('lead_id')}
            disabled={disableRelations || !selectedCompanyId}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              disabled:bg-slate-100
            "
          >
            <option value="">No lead</option>

            {filteredLeads.map((lead: Lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Deal
          </label>

          <select
            {...register('deal_id')}
            disabled={disableRelations || !selectedCompanyId}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              disabled:bg-slate-100
            "
          >
            <option value="">No deal</option>

            {filteredDeals.map((deal: Deal) => (
              <option key={deal.id} value={deal.id}>
                {deal.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Owner
          </label>

          <select
            {...register('owner_id', {
              required: 'Owner is required',
            })}
            disabled={disableRelations}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              disabled:bg-slate-100
            "
          >
            <option value="">Select owner</option>

            {users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
                {' - '}
                {user.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          rounded-lg
          bg-blue-600
          px-5
          py-2
          font-medium
          text-white
          transition
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        {isSubmitting ? 'Saving...' : 'Save Note'}
      </button>
    </form>
  );
}
