from flask import Blueprint

from app.api.v1.routes.health_routes import health_bp

api_bp = Blueprint(
    "api",
    __name__,
    url_prefix="/api/v1",
)


api_bp.register_blueprint(health_bp)


def register_blueprints(app):
    app.register_blueprint(api_bp)
