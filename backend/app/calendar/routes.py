from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.calendar.repository import CalendarRepository
from app.calendar.service import CalendarService

from app.calendar.schema import (
    calendar_event_schema,
    calendar_events_schema,
    create_calendar_event_schema,
    update_calendar_event_schema,
)

calendar_bp = Blueprint(
    "calendar",
    __name__,
    url_prefix="/calendar",
)


@calendar_bp.get("")
@jwt_required()
@require_permission("calendar.read")
def get_events():

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    events = service.get_all()

    return jsonify(calendar_events_schema.dump(events))


@calendar_bp.get("/<uuid:event_id>")
@jwt_required()
@require_permission("calendar.read")
def get_event(event_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    event = service.get_by_id(event_id)

    return jsonify(calendar_event_schema.dump(event))


@calendar_bp.post("")
@jwt_required()
@require_permission("calendar.create")
def create_event():

    data = create_calendar_event_schema.load(request.get_json())

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    event = service.create_event(data)

    return (
        jsonify(calendar_event_schema.dump(event)),
        201,
    )


@calendar_bp.put("/<uuid:event_id>")
@jwt_required()
@require_permission("calendar.update")
def update_event(event_id):

    data = update_calendar_event_schema.load(request.get_json())

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    event = service.update_event(
        event_id,
        data,
    )

    return jsonify(calendar_event_schema.dump(event))


@calendar_bp.delete("/<uuid:event_id>")
@jwt_required()
@require_permission("calendar.delete")
def delete_event(event_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    service.delete_event(event_id)

    return jsonify({"message": "Calendar event deleted successfully."})


@calendar_bp.get("/today/<uuid:owner_id>")
@jwt_required()
@require_permission("calendar.read")
def today_events(owner_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    events = service.get_today_events(owner_id)

    return jsonify(calendar_events_schema.dump(events))


@calendar_bp.get("/owner/<uuid:owner_id>")
@jwt_required()
@require_permission("calendar.read")
def owner_events(owner_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    events = service.get_owner_events(owner_id)

    return jsonify(calendar_events_schema.dump(events))


@calendar_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("calendar.read")
def company_events(company_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    events = service.get_company_events(company_id)

    return jsonify(calendar_events_schema.dump(events))


@calendar_bp.get("/contact/<uuid:contact_id>")
@jwt_required()
@require_permission("calendar.read")
def contact_events(contact_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    events = service.get_contact_events(contact_id)

    return jsonify(calendar_events_schema.dump(events))


@calendar_bp.get("/lead/<uuid:lead_id>")
@jwt_required()
@require_permission("calendar.read")
def lead_events(lead_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    events = service.get_lead_events(lead_id)

    return jsonify(calendar_events_schema.dump(events))


@calendar_bp.patch("/<uuid:event_id>/complete")
@jwt_required()
@require_permission("calendar.update")
def complete_event(event_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    event = service.complete_event(event_id)

    return jsonify(calendar_event_schema.dump(event))


@calendar_bp.patch("/<uuid:event_id>/cancel")
@jwt_required()
@require_permission("calendar.update")
def cancel_event(event_id):

    db = next(get_db())

    service = CalendarService(CalendarRepository(db))

    event = service.cancel_event(event_id)

    return jsonify(calendar_event_schema.dump(event))
