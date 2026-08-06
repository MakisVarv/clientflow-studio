from flask import Blueprint
from flask import jsonify

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.dashboard.repository import DashboardRepository
from app.dashboard.service import DashboardService
from app.dashboard.schema import dashboard_schema

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/dashboard",
)


@dashboard_bp.get("")
@jwt_required()
@require_permission("dashboard.read")
def get_dashboard():

    db = next(get_db())

    repository = DashboardRepository(db)

    service = DashboardService(repository)

    dashboard = service.get_dashboard()

    return jsonify(dashboard_schema.dump(dashboard))
