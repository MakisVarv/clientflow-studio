from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class DealSchema(Schema):

    id = fields.UUID(dump_only=True)

    lead_id = fields.UUID(required=True)

    company_id = fields.UUID(required=True)

    owner_id = fields.UUID(required=True)

    title = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=255),
    )

    value = fields.Decimal(
        required=True,
        as_string=True,
    )

    stage = fields.Str()

    probability = fields.Int(
        validate=validate.Range(min=0, max=100),
    )

    expected_close_date = fields.Date(
        allow_none=True,
    )

    closed_date = fields.Date(
        allow_none=True,
    )

    lost_reason = fields.Str(
        allow_none=True,
    )

    notes = fields.Str(
        allow_none=True,
    )

    is_active = fields.Bool()

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )


class CreateDealSchema(Schema):

    lead_id = fields.UUID(required=True)

    company_id = fields.UUID(required=True)

    owner_id = fields.UUID(required=True)

    title = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=255),
    )

    value = fields.Decimal(
        required=True,
        as_string=True,
    )

    probability = fields.Int(
        load_default=0,
        validate=validate.Range(min=0, max=100),
    )

    expected_close_date = fields.Date(
        allow_none=True,
    )

    notes = fields.Str(
        allow_none=True,
    )


class UpdateDealSchema(Schema):

    title = fields.Str(
        validate=validate.Length(min=3, max=255),
    )

    value = fields.Decimal(
        as_string=True,
    )

    stage = fields.Str()

    probability = fields.Int(
        validate=validate.Range(min=0, max=100),
    )

    expected_close_date = fields.Date(
        allow_none=True,
    )

    closed_date = fields.Date(
        allow_none=True,
    )

    lost_reason = fields.Str(
        allow_none=True,
    )

    notes = fields.Str(
        allow_none=True,
    )

    is_active = fields.Bool()


deal_schema = DealSchema()

deals_schema = DealSchema(many=True)

create_deal_schema = CreateDealSchema()

update_deal_schema = UpdateDealSchema()
