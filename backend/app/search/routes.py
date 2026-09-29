from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.activities.repository import ActivityRepository
from app.activities.schema import activities_schema
from app.attachments.repository import AttachmentRepository
from app.attachments.schema import attachments_schema
from app.common.permissions import require_permission
from app.companies.repository import CompanyRepository
from app.companies.schema import companies_schema
from app.contacts.repository import ContactRepository
from app.contacts.schema import contacts_schema
from app.database.session import db_context
from app.deals.repository import DealRepository
from app.deals.schema import deals_schema
from app.leads.repository import LeadRepository
from app.leads.schema import leads_schema
from app.notes.repository import NoteRepository
from app.notes.schema import notes_schema
from app.search.service import SearchService
from app.tasks.repository import TaskRepository
from app.tasks.schema import tasks_schema

search_bp = Blueprint(
    "search",
    __name__,
    url_prefix="/search",
)


@search_bp.get("")
@jwt_required()
@require_permission("search.read")
def global_search():

    q = request.args.get("q", "")

    with db_context() as db:

        service = SearchService(
            CompanyRepository(db),
            ContactRepository(db),
            LeadRepository(db),
            DealRepository(db),
            TaskRepository(db),
            ActivityRepository(db),
            NoteRepository(db),
            AttachmentRepository(db),
        )

        result = service.search(q)

        return jsonify(
            {
                "companies": companies_schema.dump(result["companies"]),
                "contacts": contacts_schema.dump(result["contacts"]),
                "leads": leads_schema.dump(result["leads"]),
                "deals": deals_schema.dump(result["deals"]),
                "tasks": tasks_schema.dump(result["tasks"]),
                "activities": activities_schema.dump(result["activities"]),
                "notes": notes_schema.dump(result["notes"]),
                "attachments": attachments_schema.dump(result["attachments"]),
            }
        )
