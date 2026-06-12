from flask import Flask
from flask_cors import CORS

from app.routes.health_routes import health_bp
from app.routes.contact_routes import contact_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(health_bp)
    app.register_blueprint(contact_bp)

    return app
