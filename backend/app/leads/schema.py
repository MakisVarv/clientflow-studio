from marshmallow import Schema, fields


class CreateLeadSchema(Schema):

    company_id = fields.UUID(required=True)

    contact_id = fields.UUID(required=True)

    owner_id = fields.UUID(required=True)

    title = fields.String(required=True)

    description = fields.String(allow_none=True)

    source = fields.String(allow_none=True)

    status = fields.String(allow_none=True)

    priority = fields.String(allow_none=True)

    estimated_value = fields.Decimal(allow_none=True)

    probability = fields.Integer(allow_none=True)

    expected_close_date = fields.Date(allow_none=True)

    is_active = fields.Boolean()


class UpdateLeadSchema(Schema):

    title = fields.String()

    description = fields.String(allow_none=True)

    source = fields.String(allow_none=True)

    status = fields.String(allow_none=True)

    priority = fields.String(allow_none=True)

    estimated_value = fields.Decimal(allow_none=True)

    probability = fields.Integer(allow_none=True)

    expected_close_date = fields.Date()

    is_active = fields.Boolean()


class LeadSchema(Schema):

    id = fields.UUID()

    company_id = fields.UUID(required=True)

    contact_id = fields.UUID(required=True)

    owner_id = fields.UUID(required=True)

    title = fields.String(required=True)

    description = fields.String(allow_none=True)

    source = fields.String(allow_none=True)

    status = fields.String(allow_none=True)

    priority = fields.String(allow_none=True)

    estimated_value = fields.Decimal(allow_none=True)

    probability = fields.Integer(allow_none=True)

    expected_close_date = fields.Date(allow_none=True)

    is_active = fields.Boolean()


lead_schema = LeadSchema()

leads_schema = LeadSchema(many=True)

create_lead_schema = CreateLeadSchema()

update_lead_schema = UpdateLeadSchema()
