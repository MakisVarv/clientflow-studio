from marshmallow import Schema, fields, validate


class AssignPermissionsSchema(Schema):

    permission_ids = fields.List(
        fields.UUID(),
        required=True,
        validate=validate.Length(min=1),
    )


assign_permissions_schema = AssignPermissionsSchema()
