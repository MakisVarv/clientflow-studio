from sqlalchemy import func, or_
from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.notes.model import Note
from app.common.pagination import Pagination


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

        stmt = select(Note).where(Note.is_pinned).order_by(Note.created_at.desc())

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

    def get_entity_notes(
        self,
        entity_type,
        entity_id,
        page=1,
        size=20,
    ):

        query = select(Note)

        count_query = select(func.count()).select_from(Note)

        if entity_type == "company":

            query = query.where(Note.company_id == entity_id)

            count_query = count_query.where(Note.company_id == entity_id)

        elif entity_type == "contact":

            query = query.where(Note.contact_id == entity_id)

            count_query = count_query.where(Note.contact_id == entity_id)

        elif entity_type == "lead":

            query = query.where(Note.lead_id == entity_id)

            count_query = count_query.where(Note.lead_id == entity_id)

        elif entity_type == "deal":

            query = query.where(Note.deal_id == entity_id)

            count_query = count_query.where(Note.deal_id == entity_id)

        else:

            raise ValueError("Invalid entity type.")

        query = query.order_by(
            Note.is_pinned.desc(),
            Note.created_at.desc(),
        )

        return Pagination.paginate(
            query=query,
            count_query=count_query,
            db=self.db,
            page=page,
            size=size,
        )
