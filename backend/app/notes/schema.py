from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class NoteSchema(Schema):

    id = fields.UUID(dump_only=True)

    title = fields.Str()

    content = fields.Str()

    is_pinned = fields.Bool()

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


class CreateNoteSchema(Schema):

    title = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    content = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
        ),
    )

    is_pinned = fields.Bool(
        load_default=False,
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


class UpdateNoteSchema(Schema):

    title = fields.Str(
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    content = fields.Str(
        validate=validate.Length(
            min=3,
        ),
    )

    is_pinned = fields.Bool()

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


note_schema = NoteSchema()

notes_schema = NoteSchema(
    many=True,
)

create_note_schema = CreateNoteSchema()

update_note_schema = UpdateNoteSchema()
