from flask import Blueprint

contact_bp = Blueprint("contacts", __name__)

contacts = [
    {
        "id": "c1",
        "name": "Maria Papadopoulou",
        "company": "Acme Travel",
        "email": "maria@acme.com",
        "status": "lead",
        "notes": [],
    }
]


@contact_bp.get("/api/contacts")
def get_contacts():
    return contacts
