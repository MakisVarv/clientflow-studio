# type: ignore
from flask import Blueprint, jsonify, request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.contacts.repository import ContactRepository
from app.contacts.service import ContactService

from app.contacts.schema import (
    contact_schema,
    contacts_schema,
    create_contact_schema,
    update_contact_schema,
)

contact_bp = Blueprint(
    "contacts",
    __name__,
    url_prefix="/contacts",
)


@contact_bp.get("")
@jwt_required()
@require_permission("contact.read")
def get_contacts():

    page = request.args.get(
        "page",
        default=1,
        type=int,
    )

    size = request.args.get(
        "size",
        default=10,
        type=int,
    )

    search = request.args.get(
        "search",
        default=None,
        type=str,
    )

    db = next(get_db())

    service = ContactService(ContactRepository(db))

    if search:
        contacts = service.search_contacts(
            page=page,
            size=size,
            search=search,
        )
    else:
        contacts = service.get_all()

    return jsonify(contacts_schema.dump(contacts))


@contact_bp.get("/<uuid:contact_id>")
@jwt_required()
@require_permission("contact.read")
def get_contact(contact_id):

    db = next(get_db())

    service = ContactService(ContactRepository(db))

    contact = service.get_by_id(contact_id)

    return jsonify(contact_schema.dump(contact))


@contact_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("contact.read")
def get_company_contacts(company_id):

    db = next(get_db())

    service = ContactService(ContactRepository(db))

    contacts = service.get_company_contacts(company_id)

    return jsonify(contacts_schema.dump(contacts))


@contact_bp.post("")
@jwt_required()
@require_permission("contact.create")
def create_contact():

    data = create_contact_schema.load(request.get_json())

    db = next(get_db())

    service = ContactService(ContactRepository(db))

    contact = service.create_contact(**data)

    return (
        jsonify(contact_schema.dump(contact)),
        201,
    )


@contact_bp.put("/<uuid:contact_id>")
@jwt_required()
@require_permission("contact.update")
def update_contact(contact_id):

    data = update_contact_schema.load(request.get_json())

    db = next(get_db())

    service = ContactService(ContactRepository(db))

    contact = service.update_contact(
        contact_id,
        **data,
    )

    return jsonify(contact_schema.dump(contact))


@contact_bp.delete("/<uuid:contact_id>")
@jwt_required()
@require_permission("contact.delete")
def delete_contact(contact_id):

    db = next(get_db())

    service = ContactService(ContactRepository(db))

    service.delete(contact_id)

    return (
        jsonify({"message": "Contact deleted successfully."}),
        200,
    )
