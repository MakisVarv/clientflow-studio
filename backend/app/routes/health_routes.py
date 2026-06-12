from flask import Blueprint

health_bp = Blueprint("health", __name__)


@health_bp.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "clientflow-api",
    }
