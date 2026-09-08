from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from app.common.permissions import require_permission
from app.database.session import get_db

from app.notifications.repository import NotificationRepository
from app.notifications.service import NotificationService

from app.notifications.schema import (
    notification_schema,
    notifications_schema,
    create_notification_schema,
)

notification_bp = Blueprint(
    "notifications",
    __name__,
    url_prefix="/notifications",
)


@notification_bp.get("")
@jwt_required()
@require_permission("notification.read")
def get_notifications():

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    notifications = service.get_all()

    return jsonify(notifications_schema.dump(notifications))


@notification_bp.get("/me")
@jwt_required()
@require_permission("notification.read")
def get_my_notifications():

    user_id = get_jwt_identity()

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    notifications = service.get_user_notifications(user_id)

    return jsonify(notifications_schema.dump(notifications))


@notification_bp.get("/unread")
@jwt_required()
@require_permission("notification.read")
def get_unread_notifications():

    user_id = get_jwt_identity()

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    notifications = service.get_unread_notifications(user_id)

    return jsonify(notifications_schema.dump(notifications))


@notification_bp.get("/unread/count")
@jwt_required()
@require_permission("notification.read")
def unread_count():

    user_id = get_jwt_identity()

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    count = service.get_unread_count(user_id)

    return jsonify({"count": count})


@notification_bp.post("")
@jwt_required()
@require_permission("notification.create")
def create_notification():

    data = create_notification_schema.load(request.get_json())

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    notification = service.create_notification(data)

    return (
        jsonify(notification_schema.dump(notification)),
        201,
    )


@notification_bp.patch("/<uuid:notification_id>/read")
@jwt_required()
@require_permission("notification.update")
def mark_as_read(notification_id):

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    notification = service.mark_as_read(notification_id)

    return jsonify(notification_schema.dump(notification))


@notification_bp.patch("/read-all")
@jwt_required()
@require_permission("notification.update")
def mark_all_as_read():

    user_id = get_jwt_identity()

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    notifications = service.mark_all_as_read(user_id)

    return jsonify(notifications_schema.dump(notifications))


@notification_bp.delete("/<uuid:notification_id>")
@jwt_required()
@require_permission("notification.delete")
def delete_notification(notification_id):

    db = next(get_db())

    service = NotificationService(NotificationRepository(db))

    service.delete_notification(notification_id)

    return jsonify({"message": "Notification deleted successfully."})
