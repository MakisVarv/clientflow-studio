from flask import Blueprint, current_app, jsonify

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health():
    """Health check endpoint."""

    return jsonify(
        {
            "status": "ok",
            "application": current_app.config["APP_NAME"],
            "version": current_app.config["APP_VERSION"],
        }
    )
