import { useMemo, useState } from 'react';

import {
  Download,
  Eye,
  File,
  Image,
  Search,
  Trash2,
  Upload,
} from 'lucide-react';

import toast from 'react-hot-toast';

import {
  useAttachments,
  useDeleteAttachment,
} from '../hooks/useAttachments';

import attachmentService from '../services/attachmentService';

import UploadAttachmentModal from '../components/UploadAttachmentModal';

export default function AttachmentsPage() {
  const [search, setSearch] = useState('');

  const [uploadOpen, setUploadOpen] = useState(false);

  const { data: attachments = [], isLoading } = useAttachments();

  const deleteAttachment = useDeleteAttachment();

  const filteredAttachments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return attachments;
    }

    return attachments.filter((attachment) => {
      return (
        attachment.original_name.toLowerCase().includes(query) ||
        attachment.description?.toLowerCase().includes(query)
      );
    });
  }, [attachments, search]);

  function formatFileSize(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function getFileIcon(mimeType: string) {
    if (mimeType.startsWith('image/')) {
      return <Image size={22} className="text-blue-500" />;
    }

    return <File size={22} className="text-slate-500" />;
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this attachment?');

    if (!confirmed) {
      return;
    }

    deleteAttachment.mutate(id, {
      onSuccess: () => {
        toast.success('Attachment deleted');
      },

      onError: () => {
        toast.error('Could not delete attachment');
      },
    });
  }

  function handlePreview(id: string) {
    const url = attachmentService.getPreviewUrl(id);

    window.open(url, '_blank');
  }

  function handleDownload(id: string) {
    const url = attachmentService.getDownloadUrl(id);

    window.open(url, '_blank');
  }

  return (
    <div className="p-6">
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-slate-800
            "
          >
            Attachments
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Manage uploaded CRM files.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setUploadOpen(true)}
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
          "
        >
          <Upload size={18} />
          Upload File
        </button>
      </div>

      <div
        className="
          mb-6
          flex
          max-w-xl
          items-center
          gap-2
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3
        "
      >
        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search attachments..."
          className="
            w-full
            py-2
            outline-none
          "
        />
      </div>

      {isLoading ? (
        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-8
            text-center
            text-slate-500
          "
        >
          Loading attachments...
        </div>
      ) : (
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
          "
        >
          <table className="w-full">
            <thead
              className="
                bg-slate-50
              "
            >
              <tr>
                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >
                  File
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >
                  Type
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >
                  Size
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >
                  Description
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >
                  Created
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-right
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAttachments.map((attachment) => (
                <tr
                  key={attachment.id}
                  className="
                      border-t
                      border-slate-100
                      transition
                      hover:bg-slate-50
                    "
                >
                  <td className="px-4 py-4">
                    <div
                      className="
                          flex
                          items-center
                          gap-3
                        "
                    >
                      {getFileIcon(attachment.mime_type)}

                      <div
                        className="
                            min-w-0
                          "
                      >
                        <p
                          className="
                              max-w-xs
                              truncate
                              font-medium
                              text-slate-800
                            "
                        >
                          {attachment.original_name}
                        </p>

                        <p
                          className="
                              text-xs
                              text-slate-400
                            "
                        >
                          {attachment.extension}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td
                    className="
                        px-4
                        py-4
                        text-sm
                        text-slate-600
                      "
                  >
                    {attachment.mime_type}
                  </td>

                  <td
                    className="
                        px-4
                        py-4
                        text-sm
                        text-slate-600
                      "
                  >
                    {formatFileSize(attachment.file_size)}
                  </td>

                  <td
                    className="
                        px-4
                        py-4
                        text-sm
                        text-slate-600
                      "
                  >
                    {attachment.description || '-'}
                  </td>

                  <td
                    className="
                        px-4
                        py-4
                        text-sm
                        text-slate-500
                      "
                  >
                    {new Date(attachment.created_at).toLocaleString()}
                  </td>

                  <td className="px-4 py-4">
                    <div
                      className="
                          flex
                          justify-end
                          gap-1
                        "
                    >
                      <button
                        type="button"
                        title="Preview"
                        onClick={() => handlePreview(attachment.id)}
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        title="Download"
                        onClick={() => handleDownload(attachment.id)}
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-green-50
                            hover:text-green-600
                          "
                      >
                        <Download size={18} />
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        onClick={() => handleDelete(attachment.id)}
                        disabled={deleteAttachment.isPending}
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                            disabled:opacity-50
                          "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAttachments.length === 0 && (
            <div
              className="
                  p-10
                  text-center
                  text-slate-500
                "
            >
              No attachments found.
            </div>
          )}
        </div>
      )}

      <UploadAttachmentModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </div>
  );
}
