from flask import Blueprint
from flask import jsonify
from flask import send_file
from io import BytesIO

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db


from app.reports.repository import ReportsRepository
from app.reports.service import ReportsService


from app.reports.exporters.pdf_exporter import PdfExporter
from app.reports.exporters.excel_exporter import ExcelExporter
from app.reports.exporters.csv_exporter import CsvExporter

reports_bp = Blueprint(
    "reports",
    __name__,
    url_prefix="/reports",
)


@reports_bp.get("/dashboard")
@jwt_required()
@require_permission("reports.read")
def dashboard_report():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    return jsonify(service.dashboard_report())


@reports_bp.get("/sales")
@jwt_required()
@require_permission("reports.read")
def sales_report():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    return jsonify(service.sales_report())


@reports_bp.get("/lead-funnel")
@jwt_required()
@require_permission("reports.read")
def lead_funnel():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    return jsonify(service.lead_funnel_report())


@reports_bp.get("/tasks")
@jwt_required()
@require_permission("reports.read")
def task_report():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    return jsonify(service.task_report())


@reports_bp.get("/full")
@jwt_required()
@require_permission("reports.read")
def full_report():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    return jsonify(service.full_report())


@reports_bp.get("/sales/pdf")
@jwt_required()
@require_permission("reports.read")
def sales_pdf():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    report = service.sales_report()

    pdf = PdfExporter.export(
        "Sales Report",
        report["summary"],
    )

    return send_file(
        pdf,
        download_name="Sales_Report.pdf",
        as_attachment=True,
        mimetype="application/pdf",
    )


@reports_bp.get("/sales/excel")
@jwt_required()
@require_permission("reports.read")
def sales_excel():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    report = service.sales_report()

    excel = ExcelExporter.export(
        "Sales Report",
        report["summary"],
    )

    return send_file(
        excel,
        download_name="Sales_Report.xlsx",
        as_attachment=True,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@reports_bp.get("/sales/csv")
@jwt_required()
@require_permission("reports.read")
def sales_csv():

    db = next(get_db())

    service = ReportsService(ReportsRepository(db))

    report = service.sales_report()

    csv_file = CsvExporter.export(report["summary"])

    return send_file(
        BytesIO(csv_file.getvalue().encode("utf-8")),
        download_name="Sales_Report.csv",
        as_attachment=True,
        mimetype="text/csv",
    )
