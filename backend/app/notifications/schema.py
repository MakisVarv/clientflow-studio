from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class NotificationSchema(Schema):

    id = fields.UUID(dump_only=True)

    user_id = fields.UUID(required=True)

    title = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    message = fields.Str(
        required=True,
    )

    type = fields.Str()

    is_read = fields.Bool()

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )


class CreateNotificationSchema(Schema):

    user_id = fields.UUID(required=True)

    title = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    message = fields.Str(
        required=True,
    )

    type = fields.Str(
        load_default="INFO",
    )


notification_schema = NotificationSchema()

notifications_schema = NotificationSchema(many=True)

create_notification_schema = CreateNotificationSchema()
