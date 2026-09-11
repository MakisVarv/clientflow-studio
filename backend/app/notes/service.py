from app.notes.model import Note
from app.notes.repository import NoteRepository


class NoteService:

    def __init__(self, repository: NoteRepository):

        self.repository = repository

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, note_id):

        note = self.repository.get_by_id(note_id)

        if note is None:

            raise ValueError("Note not found.")

        return note

    def create_note(self, data):

        self.validate_entity(data)

        note = Note(**data)

        return self.repository.add(note)

    def update_note(self, note_id, data):

        note = self.get_by_id(note_id)

        for key, value in data.items():

            setattr(note, key, value)

        self.validate_entity(note.__dict__)

        return self.repository.update(note)

    def delete_note(self, note_id):

        note = self.get_by_id(note_id)

        self.repository.delete(note)

    def get_company_notes(self, company_id):

        return self.repository.get_company_notes(company_id)

    def get_contact_notes(self, contact_id):

        return self.repository.get_contact_notes(contact_id)

    def get_lead_notes(self, lead_id):

        return self.repository.get_lead_notes(lead_id)

    def get_deal_notes(self, deal_id):

        return self.repository.get_deal_notes(deal_id)

    def get_owner_notes(self, owner_id):

        return self.repository.get_owner_notes(owner_id)

    def search(self, search):

        return self.repository.search(search)

    def get_recent_notes(self, limit=10):

        return self.repository.get_recent_notes(limit)

    def pin_note(self, note_id):

        note = self.get_by_id(note_id)

        note.is_pinned = True

        return self.repository.update(note)

    def unpin_note(self, note_id):

        note = self.get_by_id(note_id)

        note.is_pinned = False

        return self.repository.update(note)

    def validate_entity(self, data):

        if not any(
            [
                data.get("company_id"),
                data.get("contact_id"),
                data.get("lead_id"),
                data.get("deal_id"),
            ]
        ):

            raise ValueError("A note must belong to a Company, Contact, Lead or Deal.")

    def get_owner_notes(self, owner_id):

        return self.repository.get_owner_notes(owner_id)

    def get_pinned_notes(self):

        return self.repository.get_pinned_notes()
