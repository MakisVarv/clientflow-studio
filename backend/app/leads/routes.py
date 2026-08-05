# type: ignore
from flask import Blueprint, jsonify, request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.leads.repository import LeadRepository
from app.leads.service import LeadService

from app.leads.schema import (
    lead_schema,
    leads_schema,
    create_lead_schema,
    update_lead_schema,
)

lead_bp = Blueprint(
    "leads",
    __name__,
    url_prefix="/leads",
)


@lead_bp.get("")
@jwt_required()
@require_permission("lead.read")
def get_leads():

    page = request.args.get(
        "page",
        default=1,
        type=int,
    )

    size = request.args.get(
        "size",
        default=10,
        type=int,
    )

    search = request.args.get(
        "search",
        default=None,
        type=str,
    )

    db = next(get_db())

    service = LeadService(LeadRepository(db))

    if search:
        leads = service.search_leads(
            page=page,
            size=size,
            search=search,
        )
    else:
        leads = service.get_all()

    return jsonify(leads_schema.dump(leads))


@lead_bp.get("/<uuid:lead_id>")
@jwt_required()
@require_permission("lead.read")
def get_lead(lead_id):

    db = next(get_db())

    service = LeadService(LeadRepository(db))

    lead = service.get_by_id(lead_id)

    return jsonify(lead_schema.dump(lead))


@lead_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("lead.read")
def get_company_leads(company_id):

    db = next(get_db())

    service = LeadService(LeadRepository(db))

    leads = service.get_company_leads(company_id)

    return jsonify(leads_schema.dump(leads))


@lead_bp.post("")
@jwt_required()
@require_permission("lead.create")
def create_lead():

    data = create_lead_schema.load(request.get_json())

    db = next(get_db())

    service = LeadService(LeadRepository(db))

    lead = service.create_lead(**data)

    return (
        jsonify(lead_schema.dump(lead)),
        201,
    )


@lead_bp.put("/<uuid:lead_id>")
@jwt_required()
@require_permission("lead.update")
def update_lead(lead_id):

    data = update_lead_schema.load(request.get_json())

    db = next(get_db())

    service = LeadService(LeadRepository(db))

    lead = service.update_lead(
        lead_id,
        **data,
    )

    return jsonify(lead_schema.dump(lead))


@lead_bp.delete("/<uuid:lead_id>")
@jwt_required()
@require_permission("lead.delete")
def delete_lead(lead_id):

    db = next(get_db())

    service = LeadService(LeadRepository(db))

    service.delete(lead_id)

    return (
        jsonify({"message": "Lead deleted successfully."}),
        200,
    )
