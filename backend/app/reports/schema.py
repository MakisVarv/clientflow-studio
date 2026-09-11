from marshmallow import Schema
from marshmallow import fields


class DashboardReportSchema(Schema):

    summary = fields.Dict()


class SalesReportSchema(Schema):

    summary = fields.Dict()


class LeadFunnelReportSchema(Schema):

    lead_funnel = fields.Dict()


class TaskReportSchema(Schema):

    tasks = fields.Dict()


class FullReportSchema(Schema):

    dashboard = fields.Dict()

    sales = fields.Dict()

    lead_funnel = fields.Dict()

    tasks = fields.Dict()


dashboard_report_schema = DashboardReportSchema()

sales_report_schema = SalesReportSchema()

lead_funnel_report_schema = LeadFunnelReportSchema()

task_report_schema = TaskReportSchema()

full_report_schema = FullReportSchema()
