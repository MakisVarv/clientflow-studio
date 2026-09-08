from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class CalendarEventSchema(Schema):

    id = fields.UUID(dump_only=True)

    title = fields.Str()

    description = fields.Str(
        allow_none=True,
    )

    start_datetime = fields.DateTime()

    end_datetime = fields.DateTime()

    location = fields.Str(
        allow_none=True,
    )

    is_all_day = fields.Bool()

    color = fields.Str()

    type = fields.Str()

    status = fields.Str()

    company_id = fields.UUID(
        allow_none=True,
    )

    contact_id = fields.UUID(
        allow_none=True,
    )

    lead_id = fields.UUID(
        allow_none=True,
    )

    deal_id = fields.UUID(
        allow_none=True,
    )

    owner_id = fields.UUID()

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )


class CreateCalendarEventSchema(Schema):

    title = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    description = fields.Str(
        allow_none=True,
    )

    start_datetime = fields.DateTime(
        required=True,
    )

    end_datetime = fields.DateTime(
        required=True,
    )

    location = fields.Str(
        allow_none=True,
    )

    is_all_day = fields.Bool(
        load_default=False,
    )

    color = fields.Str(
        load_default="#2563EB",
    )

    type = fields.Str(
        load_default="MEETING",
    )

    status = fields.Str(
        load_default="SCHEDULED",
    )

    company_id = fields.UUID(
        allow_none=True,
    )

    contact_id = fields.UUID(
        allow_none=True,
    )

    lead_id = fields.UUID(
        allow_none=True,
    )

    deal_id = fields.UUID(
        allow_none=True,
    )

    owner_id = fields.UUID(
        required=True,
    )


class UpdateCalendarEventSchema(Schema):

    title = fields.Str(
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    description = fields.Str(
        allow_none=True,
    )

    start_datetime = fields.DateTime()

    end_datetime = fields.DateTime()

    location = fields.Str(
        allow_none=True,
    )

    is_all_day = fields.Bool()

    color = fields.Str()

    type = fields.Str()

    status = fields.Str()


calendar_event_schema = CalendarEventSchema()

calendar_events_schema = CalendarEventSchema(
    many=True,
)

create_calendar_event_schema = CreateCalendarEventSchema()

update_calendar_event_schema = UpdateCalendarEventSchema()
