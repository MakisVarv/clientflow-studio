from flask import Flask
from flask_cors import CORS
from app import models
from app.config import Config
from app.extensions import db, migrate
from app.routes.health_routes import health_bp
from app.routes.contact_routes import contact_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    from app import models

    app.register_blueprint(health_bp)
    app.register_blueprint(contact_bp)

    return app
