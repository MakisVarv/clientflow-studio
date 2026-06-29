import os

from flask import Flask

from app.config.config import get_config
from app.common import health_bp


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(health_bp)

    config_name = os.getenv("FLASK_ENV", "development")

    app.config.from_object(get_config(config_name))

    @app.get("/")
    def index():
        return {
            "application": app.config["APP_NAME"],
            "version": app.config["APP_VERSION"],
            "status": "running",
        }

    return app
