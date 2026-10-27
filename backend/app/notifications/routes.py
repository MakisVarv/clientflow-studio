from flask import (
    Blueprint,
    jsonify,
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from app.database.session import db_context

from app.notifications.model import NotificationType
from app.notifications.repository import (
    NotificationRepository,
)

from app.notifications.service import (
    NotificationService,
)

from app.notifications.schema import (
    notification_schema,
    notifications_schema,
)

notification_bp = Blueprint(
    "notifications",
    __name__,
    url_prefix="/notifications",
)


@notification_bp.get("")
@jwt_required()
def get_notifications():

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        notifications = service.get_notifications(user_id)

        return jsonify(notifications_schema.dump(notifications))


@notification_bp.get("/unread")
@jwt_required()
def get_unread_notifications():

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        notifications = service.get_unread_notifications(user_id)

        return jsonify(notifications_schema.dump(notifications))


@notification_bp.get("/unread-count")
@jwt_required()
def get_unread_count():

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        count = service.get_unread_count(user_id)

        return jsonify({"count": count})


@notification_bp.put("/<uuid:notification_id>/read")
@jwt_required()
def mark_notification_as_read(
    notification_id,
):

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        notification = service.mark_as_read(
            notification_id,
            user_id,
        )

        if notification is None:

            return (
                jsonify({"message": "Notification not found."}),
                404,
            )

        return jsonify(notification_schema.dump(notification))


@notification_bp.put("/<uuid:notification_id>/unread")
@jwt_required()
def mark_notification_as_unread(
    notification_id,
):

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        notification = service.mark_as_unread(
            notification_id,
            user_id,
        )

        if notification is None:

            return (
                jsonify({"message": "Notification not found."}),
                404,
            )

        return jsonify(notification_schema.dump(notification))


@notification_bp.put("/read-all")
@jwt_required()
def mark_all_notifications_as_read():

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        updated_count = service.mark_all_as_read(user_id)

        return jsonify(
            {
                "message": "Notifications marked as read.",
                "updated_count": updated_count,
            }
        )


@notification_bp.delete("/<uuid:notification_id>")
@jwt_required()
def delete_notification(
    notification_id,
):

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        deleted = service.delete_notification(
            notification_id,
            user_id,
        )

        if not deleted:

            return (
                jsonify({"message": "Notification not found."}),
                404,
            )

        return jsonify({"message": "Notification deleted successfully."})


@notification_bp.post("/test")
@jwt_required()
def test_notification():

    user_id = get_jwt_identity()

    with db_context() as db:

        repository = NotificationRepository(db)

        service = NotificationService(repository)

        notification = service.create_notification(
            user_id=user_id,
            title="Live Notification Test",
            message="WebSocket notification is working!",
            notification_type=NotificationType.SUCCESS,
        )

        return jsonify(notification_schema.dump(notification)), 201
