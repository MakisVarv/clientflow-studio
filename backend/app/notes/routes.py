from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.notes.repository import NoteRepository
from app.notes.service import NoteService


from app.notes.schema import (
    note_schema,
    notes_schema,
    create_note_schema,
    update_note_schema,
)

notes_bp = Blueprint(
    "notes",
    __name__,
    url_prefix="/notes",
)


@notes_bp.get("")
@jwt_required()
@require_permission("notes.read")
def get_notes():

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_all()

    return jsonify(notes_schema.dump(notes))


@notes_bp.get("/<uuid:note_id>")
@jwt_required()
@require_permission("notes.read")
def get_note(note_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    note = service.get_by_id(note_id)

    return jsonify(note_schema.dump(note))


@notes_bp.post("")
@jwt_required()
@require_permission("notes.create")
def create_note():

    data = create_note_schema.load(request.get_json())

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    note = service.create_note(data)

    return (
        jsonify(note_schema.dump(note)),
        201,
    )


@notes_bp.put("/<uuid:note_id>")
@jwt_required()
@require_permission("notes.update")
def update_note(note_id):

    data = update_note_schema.load(request.get_json())

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    note = service.update_note(
        note_id,
        data,
    )

    return jsonify(note_schema.dump(note))


@notes_bp.delete("/<uuid:note_id>")
@jwt_required()
@require_permission("notes.delete")
def delete_note(note_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    service.delete_note(note_id)

    return jsonify({"message": "Note deleted successfully."})


@notes_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("notes.read")
def company_notes(company_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_company_notes(company_id)

    return jsonify(notes_schema.dump(notes))


@notes_bp.get("/contact/<uuid:contact_id>")
@jwt_required()
@require_permission("notes.read")
def contact_notes(contact_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_contact_notes(contact_id)

    return jsonify(notes_schema.dump(notes))


@notes_bp.get("/lead/<uuid:lead_id>")
@jwt_required()
@require_permission("notes.read")
def lead_notes(lead_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_lead_notes(lead_id)

    return jsonify(notes_schema.dump(notes))


@notes_bp.get("/lead/<uuid:lead_id>")
@jwt_required()
@require_permission("notes.read")
def lead_notes(lead_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_lead_notes(lead_id)

    return jsonify(notes_schema.dump(notes))


@notes_bp.get("/search")
@jwt_required()
@require_permission("notes.read")
def search_notes():

    search = request.args.get("q", "")

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.search(search)

    return jsonify(notes_schema.dump(notes))


@notes_bp.get("/recent")
@jwt_required()
@require_permission("notes.read")
def recent_notes():

    limit = request.args.get(
        "limit",
        default=10,
        type=int,
    )

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_recent_notes(limit)

    return jsonify(notes_schema.dump(notes))


@notes_bp.patch("/<uuid:note_id>/pin")
@jwt_required()
@require_permission("notes.update")
def pin_note(note_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    note = service.pin_note(note_id)

    return jsonify(note_schema.dump(note))


@notes_bp.patch("/<uuid:note_id>/unpin")
@jwt_required()
@require_permission("notes.update")
def unpin_note(note_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    note = service.unpin_note(note_id)

    return jsonify(note_schema.dump(note))


@notes_bp.get("/owner/<uuid:owner_id>")
@jwt_required()
@require_permission("notes.read")
def owner_notes(owner_id):

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_owner_notes(owner_id)

    return jsonify(notes_schema.dump(notes))


@notes_bp.get("/pinned")
@jwt_required()
@require_permission("notes.read")
def pinned_notes():

    db = next(get_db())

    service = NoteService(NoteRepository(db))

    notes = service.get_pinned_notes()

    return jsonify(notes_schema.dump(notes))
