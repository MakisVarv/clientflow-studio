# type: ignore
from uuid import UUID

from app.contacts.model import Contact
from app.contacts.repository import ContactRepository


class ContactService:

    def __init__(
        self,
        repository: ContactRepository,
    ):
        self.repository = repository

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(
        self,
        contact_id: UUID,
    ):

        return self.repository.get_by_id(contact_id)

    def get_company_contacts(
        self,
        company_id: UUID,
    ):

        return self.repository.get_company_contacts(company_id)

    def create_contact(
        self,
        **data,
    ):

        email = data.get("email")

        if email and self.repository.email_exists(email):
            raise ValueError("Contact email already exists.")

        if data.get("is_primary"):

            primary = self.repository.get_primary_contact(data["company_id"])

            if primary:
                primary.is_primary = False

        contact = Contact(**data)

        return self.repository.create(contact)

    def update_contact(
        self,
        contact_id: UUID,
        **data,
    ):

        contact = self.repository.get_by_id(contact_id)

        if not contact:
            raise ValueError("Contact not found.")

        email = data.get("email")

        if email and email != contact.email and self.repository.email_exists(email):
            raise ValueError("Contact email already exists.")

        if data.get("is_primary"):

            primary = self.repository.get_primary_contact(contact.company_id)

            if primary and primary.id != contact.id:
                primary.is_primary = False

        for key, value in data.items():
            setattr(contact, key, value)

        return self.repository.update(contact)

    def delete(
        self,
        contact_id: UUID,
    ):

        contact = self.repository.get_by_id(contact_id)

        if not contact:
            raise ValueError("Contact not found.")

        return self.repository.delete(contact)

    def search_contacts(
        self,
        page=1,
        size=10,
        search=None,
    ):

        return self.repository.search(
            page=page,
            size=size,
            search=search,
        )
