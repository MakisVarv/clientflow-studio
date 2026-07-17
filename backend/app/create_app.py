import os

from flask import Flask

from app.config.config import get_config
from app.common import health_bp
from app.core import db, migrate, jwt, ma, swagger
from app.users.routes import user_bp
from app.roles.routes import role_bp
from app.auth.routes import auth_bp
from app.common.exceptions import register_error_handlers
from app.permissions.routes import permission_bp
from app.core import db
from app.seeds.permission_seed import seed_permissions


def create_app() -> Flask:

    app = Flask(__name__)
    app.register_blueprint(health_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(role_bp)
    app.register_blueprint(permission_bp)

    register_error_handlers(app)

    config_name = os.getenv("FLASK_ENV", "development")

    app.config.from_object(get_config(config_name))

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    swagger.init_app(app)
    register_error_handlers(app)
    jwt.init_app(app)
    with app.app_context():
        seed_permissions(db.session)

    return app
