from marshmallow import Schema, fields


class UserSchema(Schema):
    """User response schema."""

    id = fields.UUID()

    first_name = fields.String()

    last_name = fields.String()

    email = fields.Email()

    phone = fields.String(allow_none=True)

    is_active = fields.Boolean()


user_schema = UserSchema()

users_schema = UserSchema(many=True)


class CreateUserSchema(Schema):
    """Schema used to create a user."""

    first_name = fields.String(required=True)

    last_name = fields.String(required=True)

    email = fields.Email(required=True)

    password = fields.String(required=True)

    phone = fields.String(
        required=False,
        allow_none=True,
    )


create_user_schema = CreateUserSchema()


class UpdateUserSchema(Schema):

    first_name = fields.String(required=True)

    last_name = fields.String(required=True)

    email = fields.Email(required=True)

    phone = fields.String(
        required=False,
        allow_none=True,
    )


update_user_schema = UpdateUserSchema()
