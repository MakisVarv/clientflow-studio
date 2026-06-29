from flask import Blueprint, jsonify

health_bp = Blueprint(
    "health",
    __name__,
)


@health_bp.get("/health")
def health():
    """Health check endpoint."""

    return jsonify(
        {
            "status": "ok",
            "application": "ClientFlow CRM",
            "version": "1.0.0",
        }
    )
