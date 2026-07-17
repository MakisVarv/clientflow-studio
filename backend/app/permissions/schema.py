from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class CreatePermissionSchema(Schema):

    name = fields.String(
        required=True,
        validate=validate.Length(
            min=3,
            max=100,
        ),
    )

    description = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=255,
        ),
    )


class PermissionSchema(Schema):

    id = fields.UUID()

    name = fields.String()

    description = fields.String(
        allow_none=True,
    )

    created_at = fields.DateTime()

    updated_at = fields.DateTime()


create_permission_schema = CreatePermissionSchema()

permission_schema = PermissionSchema()

permissions_schema = PermissionSchema(many=True)
