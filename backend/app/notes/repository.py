from sqlalchemy import or_
from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.notes.model import Note


class NoteRepository(BaseRepository):

    def __init__(self, db):

        super().__init__(db, Note)

    # -------------------------------------------------
    # Company
    # -------------------------------------------------

    def get_company_notes(self, company_id):

        stmt = (
            select(Note)
            .where(Note.company_id == company_id)
            .order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Contact
    # -------------------------------------------------

    def get_contact_notes(self, contact_id):

        stmt = (
            select(Note)
            .where(Note.contact_id == contact_id)
            .order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Lead
    # -------------------------------------------------

    def get_lead_notes(self, lead_id):

        stmt = (
            select(Note).where(Note.lead_id == lead_id).order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Deal
    # -------------------------------------------------

    def get_deal_notes(self, deal_id):

        stmt = (
            select(Note).where(Note.deal_id == deal_id).order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Owner
    # -------------------------------------------------

    def get_owner_notes(self, owner_id):

        stmt = (
            select(Note)
            .where(Note.owner_id == owner_id)
            .order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Pinned
    # -------------------------------------------------

    def get_pinned_notes(self):

        stmt = (
            select(Note).where(Note.is_pinned == True).order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Search
    # -------------------------------------------------

    def search(self, search):

        stmt = (
            select(Note)
            .where(
                or_(
                    Note.title.ilike(f"%{search}%"),
                    Note.content.ilike(f"%{search}%"),
                )
            )
            .order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_recent_notes(self, limit=10):

        stmt = select(Note).order_by(Note.created_at.desc()).limit(limit)

        return self.db.scalars(stmt).all()

    def get_owner_notes(self, owner_id):

        stmt = (
            select(Note)
            .where(Note.owner_id == owner_id)
            .order_by(
                Note.is_pinned.desc(),
                Note.created_at.desc(),
            )
        )

        return self.db.scalars(stmt).all()

    def get_pinned_notes(self):

        stmt = (
            select(Note).where(Note.is_pinned == True).order_by(Note.created_at.desc())
        )

        return self.db.scalars(stmt).all()
