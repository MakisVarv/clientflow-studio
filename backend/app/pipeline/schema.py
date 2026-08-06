from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate


class MoveLeadSchema(Schema):

    status = fields.Str(
        required=True,
        validate=validate.OneOf(
            [
                "NEW",
                "CONTACTED",
                "QUALIFIED",
                "PROPOSAL",
                "NEGOTIATION",
                "WON",
                "LOST",
            ]
        ),
    )


move_lead_schema = MoveLeadSchema()
