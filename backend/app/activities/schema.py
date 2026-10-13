# type: ignore
from marshmallow import Schema, fields, validate


class ActivitySchema(Schema):

    id = fields.UUID(dump_only=True)

    company_id = fields.UUID(required=True)

    contact_id = fields.UUID(allow_none=True)

    lead_id = fields.UUID(allow_none=True)

    deal_id = fields.UUID(allow_none=True)

    owner_id = fields.UUID(required=True)

    type = fields.Method("serialize_type")

    subject = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=255),
    )

    description = fields.Str(
        allow_none=True,
    )

    completed = fields.Bool()

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )

    def serialize_type(self, obj):

        if obj.type is None:
            return None

        return obj.type.value


class CreateActivitySchema(Schema):

    company_id = fields.UUID(required=True)

    contact_id = fields.UUID(allow_none=True)

    lead_id = fields.UUID(allow_none=True)

    deal_id = fields.UUID(allow_none=True)

    owner_id = fields.UUID(required=True)

    type = fields.Str(required=True)

    subject = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=255),
    )

    description = fields.Str(
        allow_none=True,
    )


class UpdateActivitySchema(Schema):

    type = fields.Str()

    subject = fields.Str(
        validate=validate.Length(min=3, max=255),
    )

    description = fields.Str(
        allow_none=True,
    )

    completed = fields.Bool()


activity_schema = ActivitySchema()

activities_schema = ActivitySchema(many=True)

create_activity_schema = CreateActivitySchema()

update_activity_schema = UpdateActivitySchema()
