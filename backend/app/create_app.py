import os

from flask import Flask

from app.activities.routes import activity_bp
from app.attachments.routes import attachments_bp
from app.auth.routes import auth_bp
from app.calendar.routes import calendar_bp
from app.common import health_bp
from app.common.error_handler import register_error_handlers
from app.companies.routes import company_bp
from app.config.config import get_config
from app.contacts.routes import contact_bp
from app.core.extensions import register_extensions
from app.dashboard.routes import dashboard_bp
from app.deals.routes import deal_bp
from app.leads.routes import lead_bp
from app.notes.routes import notes_bp
from app.notifications.routes import notification_bp
from app.permissions.routes import permission_bp
from app.pipeline.routes import pipeline_bp
from app.reports.routes import reports_bp
from app.roles.routes import role_bp
from app.search.routes import search_bp
from app.tasks.routes import task_bp
from app.users.routes import user_bp


def create_app() -> Flask:

    app = Flask(__name__)
    app.register_blueprint(health_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(role_bp)
    app.register_blueprint(permission_bp)
    app.register_blueprint(company_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(lead_bp)
    app.register_blueprint(deal_bp)
    app.register_blueprint(activity_bp)
    app.register_blueprint(task_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(pipeline_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(calendar_bp)
    app.register_blueprint(reports_bp)
    app.register_blueprint(notes_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(attachments_bp)

    register_error_handlers(app)

    config_name = os.getenv("FLASK_ENV", "development")

    app.config.from_object(get_config(config_name))

    register_extensions(app)

    return app
