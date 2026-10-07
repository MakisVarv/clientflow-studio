from marshmallow import Schema, fields, validate


class DealSchema(Schema):

    id = fields.UUID(dump_only=True)

    lead_id = fields.UUID(required=True)

    company_id = fields.UUID(required=True)

    owner_id = fields.UUID(required=True)

    title = fields.Str(required=True)

    value = fields.Decimal(
        required=True,
        as_string=True,
    )

    stage = fields.Method("serialize_stage")

    probability = fields.Int()

    expected_close_date = fields.Date(allow_none=True)

    closed_date = fields.Date(allow_none=True)

    lost_reason = fields.Str(allow_none=True)

    notes = fields.Str(allow_none=True)

    is_active = fields.Bool()

    created_at = fields.DateTime(dump_only=True)

    updated_at = fields.DateTime(dump_only=True)

    def serialize_stage(self, obj):

        if obj.stage is None:
            return None

        return obj.stage.value


class CreateDealSchema(Schema):

    lead_id = fields.UUID(required=True)

    company_id = fields.UUID(required=True)

    owner_id = fields.UUID(required=True)

    title = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=255),
    )
    stage = fields.Str()

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
