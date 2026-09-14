from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class AttachmentSchema(Schema):

    id = fields.UUID(
        dump_only=True,
    )

    original_name = fields.Str()

    stored_name = fields.Str()

    extension = fields.Str()

    mime_type = fields.Str()

    file_size = fields.Int()

    file_path = fields.Str()

    description = fields.Str(
        allow_none=True,
    )

    is_public = fields.Bool()

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


class CreateAttachmentSchema(Schema):

    description = fields.Str(
        allow_none=True,
    )

    is_public = fields.Bool(
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


class UpdateAttachmentSchema(Schema):

    description = fields.Str(
        allow_none=True,
    )

    is_public = fields.Bool()


attachment_schema = AttachmentSchema()

attachments_schema = AttachmentSchema(
    many=True,
)

create_attachment_schema = CreateAttachmentSchema()

update_attachment_schema = UpdateAttachmentSchema()
