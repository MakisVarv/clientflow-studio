from marshmallow import Schema, fields


class CreateContactSchema(Schema):

    company_id = fields.UUID(required=True)

    first_name = fields.String(required=True)

    last_name = fields.String(required=True)

    email = fields.Email(allow_none=True)

    phone = fields.String(allow_none=True)

    mobile = fields.String(allow_none=True)

    position = fields.String(allow_none=True)

    department = fields.String(allow_none=True)

    notes = fields.String(allow_none=True)

    is_primary = fields.Boolean()


class UpdateContactSchema(Schema):

    first_name = fields.String()

    last_name = fields.String()

    email = fields.Email(allow_none=True)

    phone = fields.String(allow_none=True)

    mobile = fields.String(allow_none=True)

    position = fields.String(allow_none=True)

    department = fields.String(allow_none=True)

    notes = fields.String(allow_none=True)

    is_primary = fields.Boolean()

    is_active = fields.Boolean()


class ContactSchema(Schema):

    id = fields.UUID()

    company_id = fields.UUID()

    first_name = fields.String()

    last_name = fields.String()

    email = fields.Email()

    phone = fields.String()

    mobile = fields.String()

    position = fields.String()

    department = fields.String()

    notes = fields.String()

    is_primary = fields.Boolean()

    is_active = fields.Boolean()

    created_at = fields.DateTime()

    updated_at = fields.DateTime()


contact_schema = ContactSchema()

contacts_schema = ContactSchema(many=True)

create_contact_schema = CreateContactSchema()

update_contact_schema = UpdateContactSchema()
