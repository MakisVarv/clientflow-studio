from sqlalchemy import or_
from sqlalchemy import select

from app.attachments.model import Attachment
from app.common.base_repository import BaseRepository


class AttachmentRepository(BaseRepository):

    def __init__(self, db):

        super().__init__(db, Attachment)

    def get_company_attachments(self, company_id):

        stmt = (
            select(Attachment)
            .where(Attachment.company_id == company_id)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_contact_attachments(self, contact_id):

        stmt = (
            select(Attachment)
            .where(Attachment.contact_id == contact_id)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_lead_attachments(self, lead_id):

        stmt = (
            select(Attachment)
            .where(Attachment.lead_id == lead_id)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_deal_attachments(self, deal_id):

        stmt = (
            select(Attachment)
            .where(Attachment.deal_id == deal_id)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_owner_attachments(self, owner_id):

        stmt = (
            select(Attachment)
            .where(Attachment.owner_id == owner_id)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_public_attachments(self):

        stmt = (
            select(Attachment)
            .where(Attachment.is_public == True)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def search(self, search):

        stmt = (
            select(Attachment)
            .where(
                or_(
                    Attachment.original_name.ilike(f"%{search}%"),
                    Attachment.description.ilike(f"%{search}%"),
                )
            )
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_by_extension(self, extension):

        stmt = (
            select(Attachment)
            .where(Attachment.extension == extension)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_by_mime_type(self, mime_type):

        stmt = (
            select(Attachment)
            .where(Attachment.mime_type == mime_type)
            .order_by(Attachment.created_at.desc())
        )

        return self.db.scalars(stmt).all()
