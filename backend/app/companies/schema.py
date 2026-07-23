from marshmallow import Schema, fields


class CreateCompanySchema(Schema):

    name = fields.String(required=True)

    vat_number = fields.String()

    email = fields.Email()

    phone = fields.String()

    website = fields.String()

    industry = fields.String()

    employees_count = fields.Integer()

    country = fields.String()

    city = fields.String()

    address = fields.String()

    postal_code = fields.String()

    description = fields.String()


class UpdateCompanySchema(Schema):

    name = fields.String()

    vat_number = fields.String()

    email = fields.Email()

    phone = fields.String()

    website = fields.String()

    industry = fields.String()

    employees_count = fields.Integer()

    country = fields.String()

    city = fields.String()

    address = fields.String()

    postal_code = fields.String()

    description = fields.String()

    is_active = fields.Boolean()


class CompanySchema(Schema):

    id = fields.UUID()

    name = fields.String()

    vat_number = fields.String()

    email = fields.Email()

    phone = fields.String()

    website = fields.String()

    industry = fields.String()

    employees_count = fields.Integer()

    country = fields.String()

    city = fields.String()

    address = fields.String()

    postal_code = fields.String()

    description = fields.String()

    is_active = fields.Boolean()

    created_at = fields.DateTime()

    updated_at = fields.DateTime()


company_schema = CompanySchema()

companies_schema = CompanySchema(many=True)

create_company_schema = CreateCompanySchema()

update_company_schema = UpdateCompanySchema()
