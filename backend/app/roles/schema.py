from marshmallow import Schema, fields


class RoleSchema(Schema):
    """Role response schema."""

    id = fields.UUID()

    name = fields.String()

    description = fields.String(allow_none=True)


role_schema = RoleSchema()

roles_schema = RoleSchema(many=True)


class CreateRoleSchema(Schema):

    name = fields.String(required=True)

    description = fields.String(
        required=False,
        allow_none=True,
    )

create_role_schema = CreateRoleSchema()


class UpdateRoleSchema(Schema):
    name = fields.String(required=True)

    description = fields.String(
        required=False,
        allow_none=True,
    )
update_role_schema = UpdateRoleSchema()
