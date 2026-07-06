import os

from flask import Flask

from app.config.config import get_config
from app.common import health_bp
from app.core import db, migrate, jwt, ma, swagger
from app.users.routes import user_bp


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(health_bp)
    app.register_blueprint(user_bp)

    config_name = os.getenv("FLASK_ENV", "development")

    app.config.from_object(get_config(config_name))

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    swagger.init_app(app)

    return app
