# type: ignore
from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.activities.repository import ActivityRepository
from app.activities.service import ActivityService

from app.activities.schema import (
    activity_schema,
    activities_schema,
    create_activity_schema,
    update_activity_schema,
)

activity_bp = Blueprint(
    "activities",
    __name__,
    url_prefix="/activities",
)


@activity_bp.get("")
@jwt_required()
@require_permission("activity.read")
def get_activities():

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

    service = ActivityService(ActivityRepository(db))

    if search:
        activities = service.search(search)
    else:
        activities = service.get_all()

    return jsonify(activities_schema.dump(activities))


@activity_bp.get("/<uuid:activity_id>")
@jwt_required()
@require_permission("activity.read")
def get_activity(activity_id):

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activity = service.get_by_id(activity_id)

    return jsonify(activity_schema.dump(activity))


@activity_bp.post("")
@jwt_required()
@require_permission("activity.create")
def create_activity():

    data = create_activity_schema.load(request.get_json())

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activity = service.create_activity(data)

    return (
        jsonify(activity_schema.dump(activity)),
        201,
    )


@activity_bp.put("/<uuid:activity_id>")
@jwt_required()
@require_permission("activity.update")
def update_activity(activity_id):

    data = update_activity_schema.load(request.get_json())

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activity = service.update_activity(
        activity_id,
        data,
    )

    return jsonify(activity_schema.dump(activity))


@activity_bp.delete("/<uuid:activity_id>")
@jwt_required()
@require_permission("activity.delete")
def delete_activity(activity_id):

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    service.delete_activity(activity_id)

    return (
        jsonify({"message": "Activity deleted successfully."}),
        200,
    )


@activity_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("activity.read")
def get_company_activities(company_id):

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activities = service.get_company_activities(company_id)

    return jsonify(activities_schema.dump(activities))


@activity_bp.get("/contact/<uuid:contact_id>")
@jwt_required()
@require_permission("activity.read")
def get_contact_activities(contact_id):

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activities = service.get_contact_activities(contact_id)

    return jsonify(activities_schema.dump(activities))


@activity_bp.get("/lead/<uuid:lead_id>")
@jwt_required()
@require_permission("activity.read")
def get_lead_activities(lead_id):

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activities = service.get_lead_activities(lead_id)

    return jsonify(activities_schema.dump(activities))


@activity_bp.get("/deal/<uuid:deal_id>")
@jwt_required()
@require_permission("activity.read")
def get_deal_activities(deal_id):

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activities = service.get_deal_activities(deal_id)

    return jsonify(activities_schema.dump(activities))


@activity_bp.get("/owner/<uuid:owner_id>")
@jwt_required()
@require_permission("activity.read")
def get_owner_activities(owner_id):

    db = next(get_db())

    service = ActivityService(ActivityRepository(db))

    activities = service.get_owner_activities(owner_id)

    return jsonify(activities_schema.dump(activities))
