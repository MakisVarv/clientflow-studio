from marshmallow import Schema
from marshmallow import fields


class DashboardSchema(Schema):

    companies = fields.Integer()

    contacts = fields.Integer()

    leads = fields.Integer()

    deals = fields.Integer()

    activities = fields.Integer()

    tasks = fields.Integer()

    completed_tasks = fields.Integer()

    pending_tasks = fields.Integer()

    lead_status = fields.Dict(
        keys=fields.String(),
        values=fields.Integer(),
    )

    deal_stage = fields.Dict(
        keys=fields.String(),
        values=fields.Integer(),
    )

    activity_type = fields.Dict(
        keys=fields.String(),
        values=fields.Integer(),
    )

    total_sales = fields.Float()

    average_deal = fields.Float()


dashboard_schema = DashboardSchema()
