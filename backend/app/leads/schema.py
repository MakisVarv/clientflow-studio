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

    company_id = fields.UUID()

    contact_id = fields.UUID()

    owner_id = fields.UUID()

    title = fields.String()

    description = fields.String(allow_none=True)

    source = fields.Method("serialize_source")

    status = fields.Method("serialize_status")

    priority = fields.Method("serialize_priority")

    estimated_value = fields.Decimal(allow_none=True)

    probability = fields.Integer(allow_none=True)

    expected_close_date = fields.Date(allow_none=True)

    is_active = fields.Boolean()

    def serialize_source(self, obj):

        if obj.source is None:
            return None

        return obj.source.name

    def serialize_status(self, obj):

        if obj.status is None:
            return None

        return obj.status.name

    def serialize_priority(self, obj):

        if obj.priority is None:
            return None

        return obj.priority.name


lead_schema = LeadSchema()

leads_schema = LeadSchema(many=True)

create_lead_schema = CreateLeadSchema()

update_lead_schema = UpdateLeadSchema()
