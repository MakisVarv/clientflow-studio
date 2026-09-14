import os
import uuid

from werkzeug.utils import secure_filename

from app.attachments.model import Attachment
from app.attachments.repository import AttachmentRepository


class AttachmentService:

    ALLOWED_EXTENSIONS = {
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "csv",
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp",
        "zip",
    }

    MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB

    UPLOAD_FOLDER = "uploads"

    def __init__(self, repository: AttachmentRepository):

        self.repository = repository

    # -------------------------------------------------
    # CRUD
    # -------------------------------------------------

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, attachment_id):

        attachment = self.repository.get_by_id(attachment_id)

        if attachment is None:

            raise ValueError("Attachment not found.")

        return attachment

    def delete_attachment(self, attachment_id):

        attachment = self.get_by_id(attachment_id)

        if os.path.exists(attachment.file_path):

            os.remove(attachment.file_path)

        self.repository.delete(attachment)

    # -------------------------------------------------
    # Upload
    # -------------------------------------------------

    def upload(
        self,
        file,
        data,
    ):

        self.validate_file(file)

        original_name = secure_filename(file.filename)

        extension = original_name.rsplit(
            ".",
            1,
        )[1].lower()

        stored_name = f"{uuid.uuid4()}.{extension}"

        upload_folder = self.get_upload_folder(data)

        os.makedirs(
            upload_folder,
            exist_ok=True,
        )

        path = os.path.join(
            upload_folder,
            stored_name,
        )

        file.save(path)

        attachment = Attachment(
            original_name=original_name,
            stored_name=stored_name,
            extension=extension,
            mime_type=file.mimetype,
            file_size=os.path.getsize(path),
            file_path=path,
            company_id=data.get("company_id"),
            contact_id=data.get("contact_id"),
            lead_id=data.get("lead_id"),
            deal_id=data.get("deal_id"),
            owner_id=data.get("owner_id"),
            description=data.get("description"),
            is_public=data.get(
                "is_public",
                False,
            ),
        )

        return self.repository.add(attachment)

    # -------------------------------------------------
    # Validation
    # -------------------------------------------------

    def validate_file(
        self,
        file,
    ):

        if not file:

            raise ValueError("No file uploaded.")

        if "." not in file.filename:

            raise ValueError("Invalid filename.")

        extension = file.filename.rsplit(
            ".",
            1,
        )[1].lower()

        if extension not in self.ALLOWED_EXTENSIONS:

            raise ValueError("File type not allowed.")

        file.seek(
            0,
            os.SEEK_END,
        )

        size = file.tell()

        file.seek(0)

        if size > self.MAX_FILE_SIZE:

            raise ValueError("File is too large.")

    # -------------------------------------------------
    # Search
    # -------------------------------------------------

    def search(
        self,
        search,
    ):

        return self.repository.search(search)

    def get_company_attachments(
        self,
        company_id,
    ):

        return self.repository.get_company_attachments(company_id)

    def get_contact_attachments(
        self,
        contact_id,
    ):

        return self.repository.get_contact_attachments(contact_id)

    def get_lead_attachments(
        self,
        lead_id,
    ):

        return self.repository.get_lead_attachments(lead_id)

    def get_deal_attachments(
        self,
        deal_id,
    ):

        return self.repository.get_deal_attachments(deal_id)

    def get_owner_attachments(
        self,
        owner_id,
    ):

        return self.repository.get_owner_attachments(owner_id)

    def get_public_attachments(self):

        return self.repository.get_public_attachments()

    def get_upload_folder(self, data) -> str:

        if data.get("company_id"):
            return os.path.join("uploads", "companies")

        elif data.get("contact_id"):
            return os.path.join("uploads", "contacts")

        elif data.get("lead_id"):
            return os.path.join("uploads", "leads")

        elif data.get("deal_id"):
            return os.path.join("uploads", "deals")

        return os.path.join("uploads", "general")

    def preview_attachment(self, attachment_id):

        attachment = self.get_by_id(attachment_id)

        allowed = {
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/gif",
            "image/webp",
            "application/pdf",
        }

        if attachment.mime_type not in allowed:

            raise ValueError("Preview not supported.")

        return attachment
