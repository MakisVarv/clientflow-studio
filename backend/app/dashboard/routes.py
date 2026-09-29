from app.common.permissions import require_permission
from app.dashboard.repository import DashboardRepository
from app.dashboard.schema import dashboard_schema
from app.dashboard.service import DashboardService
from app.database.session import db_context
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/dashboard",
)


@dashboard_bp.get("")
@jwt_required()
@require_permission("dashboard.read")
def get_dashboard():

    with db_context() as db:

        repository = DashboardRepository(db)

        service = DashboardService(repository)

        dashboard = service.get_dashboard()

        return jsonify(dashboard_schema.dump(dashboard))
