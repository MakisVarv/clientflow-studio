from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class TaskSchema(Schema):

    id = fields.UUID(dump_only=True)

    company_id = fields.UUID(required=True)

    contact_id = fields.UUID(
        allow_none=True,
    )

    lead_id = fields.UUID(
        allow_none=True,
    )

    deal_id = fields.UUID(
        allow_none=True,
    )

    owner_id = fields.UUID(required=True)

    assigned_to_id = fields.UUID(
        allow_none=True,
    )

    title = fields.String(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    description = fields.String(
        allow_none=True,
    )

    due_date = fields.Date(
        allow_none=True,
    )

    completed_at = fields.Date(
        allow_none=True,
    )

    status = fields.String()

    priority = fields.String()

    completed = fields.Boolean()

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )


class CreateTaskSchema(Schema):

    company_id = fields.UUID(required=True)

    contact_id = fields.UUID(
        allow_none=True,
    )

    lead_id = fields.UUID(
        allow_none=True,
    )

    deal_id = fields.UUID(
        allow_none=True,
    )

    owner_id = fields.UUID(required=True)

    assigned_to_id = fields.UUID(
        allow_none=True,
    )

    title = fields.String(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    description = fields.String(
        allow_none=True,
    )

    due_date = fields.Date(
        allow_none=True,
    )

    priority = fields.String(
        load_default="MEDIUM",
    )


class UpdateTaskSchema(Schema):

    assigned_to_id = fields.UUID(
        allow_none=True,
    )

    title = fields.String(
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    description = fields.String(
        allow_none=True,
    )

    due_date = fields.Date(
        allow_none=True,
    )

    completed_at = fields.Date(
        allow_none=True,
    )

    status = fields.String()

    priority = fields.String()

    completed = fields.Boolean()


task_schema = TaskSchema()

tasks_schema = TaskSchema(many=True)

create_task_schema = CreateTaskSchema()

update_task_schema = UpdateTaskSchema()
