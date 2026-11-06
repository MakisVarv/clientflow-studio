import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

import useCompanies from '../../companies/hooks/useCompanies';

import useContacts from '../../contacts/hooks/useContacts';

import useLeads from '../../leads/hooks/useLeads';

import useDeals from '../../deals/hooks/useDeals';

import useUsers from '../../users/hooks/useUsers';

import { useUploadAttachment } from '../hooks/useAttachments';

type UploadAttachmentModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function UploadAttachmentModal({
  open,
  onClose,
}: UploadAttachmentModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const [description, setDescription] = useState('');

  const [companyId, setCompanyId] = useState('');

  const [contactId, setContactId] = useState('');

  const [leadId, setLeadId] = useState('');

  const [dealId, setDealId] = useState('');

  const [ownerId, setOwnerId] = useState('');

  const [isPublic, setIsPublic] = useState(false);

  const { data: companies = [] } = useCompanies();

  const { data: contacts = [] } = useContacts();

  const { data: leads = [] } = useLeads();

  const { data: deals = [] } = useDeals();

  const { data: users = [] } = useUsers();

  const uploadAttachment = useUploadAttachment();

  const filteredContacts = contacts.filter(
    (contact) => contact.company_id === companyId,
  );

  const filteredLeads = leads.filter(
    (lead) => lead.company_id === companyId,
  );

  const filteredDeals = deals.filter(
    (deal) => deal.company_id === companyId,
  );

  function resetForm() {
    setFile(null);

    setDescription('');

    setCompanyId('');

    setContactId('');

    setLeadId('');

    setDealId('');

    setOwnerId('');

    setIsPublic(false);
  }

  function handleClose() {
    resetForm();

    onClose();
  }

  function handleCompanyChange(value: string) {
    setCompanyId(value);

    setContactId('');

    setLeadId('');

    setDealId('');
  }

  function handleSubmit() {
    if (!file) {
      toast.error('Please select a file');

      return;
    }

    if (!ownerId) {
      toast.error('Please select an owner');

      return;
    }

    uploadAttachment.mutate(
      {
        file,

        description: description || undefined,

        company_id: companyId || null,

        contact_id: contactId || null,

        lead_id: leadId || null,

        deal_id: dealId || null,

        owner_id: ownerId,

        is_public: isPublic,
      },
      {
        onSuccess: () => {
          toast.success('File uploaded successfully');

          handleClose();
        },

        onError: () => {
          toast.error('File upload failed');
        },
      },
    );
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-xl
          bg-white
          shadow-xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-4
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-slate-800
              "
            >
              Upload Attachment
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Upload a file and connect it with CRM records.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="
            max-h-[70vh]
            space-y-5
            overflow-y-auto
            p-6
          "
        >
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              File
            </label>

            <label
              className="
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                border-slate-300
                bg-slate-50
                p-8
                transition
                hover:border-blue-400
                hover:bg-blue-50
              "
            >
              <Upload
                size={32}
                className="
                  mb-3
                  text-slate-400
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Select file
              </span>

              <span
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Click to browse
              </span>

              <input
                type="file"
                className="hidden"
                onChange={(event) => {
                  const selectedFile =
                    event.target.files?.[0] ?? null;

                  setFile(selectedFile);
                }}
              />
            </label>

            {file && (
              <div
                className="
                  mt-3
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                "
              >
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  {file.name}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Optional description..."
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
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Company
              </label>

              <select
                value={companyId}
                onChange={(event) =>
                  handleCompanyChange(event.target.value)
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-4
                  py-2
                "
              >
                <option value="">No company</option>

                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Contact
              </label>

              <select
                value={contactId}
                onChange={(event) => setContactId(event.target.value)}
                disabled={!companyId}
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

                {filteredContacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.first_name} {contact.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Lead
              </label>

              <select
                value={leadId}
                onChange={(event) => setLeadId(event.target.value)}
                disabled={!companyId}
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

                {filteredLeads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Deal
              </label>

              <select
                value={dealId}
                onChange={(event) => setDealId(event.target.value)}
                disabled={!companyId}
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

                {filteredDeals.map((deal) => (
                  <option key={deal.id} value={deal.id}>
                    {deal.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Owner
              </label>

              <select
                value={ownerId}
                onChange={(event) => setOwnerId(event.target.value)}
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-4
                  py-2
                "
              >
                <option value="">Select owner</option>

                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                    {' - '}
                    {user.email}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="
                flex
                items-end
              "
            >
              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  pb-2
                  text-sm
                  text-slate-700
                "
              >
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(event) =>
                    setIsPublic(event.target.checked)
                  }
                  className="
                    h-4
                    w-4
                  "
                />
                Public attachment
              </label>
            </div>
          </div>
        </div>

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-slate-200
            px-6
            py-4
          "
        >
          <button
            type="button"
            onClick={handleClose}
            disabled={uploadAttachment.isPending}
            className="
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              font-medium
              text-slate-700
              transition
              hover:bg-slate-50
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={uploadAttachment.isPending}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-blue-600
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Upload size={18} />

            {uploadAttachment.isPending ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
