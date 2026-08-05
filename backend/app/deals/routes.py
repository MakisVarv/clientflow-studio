# type: ignore
from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.deals.repository import DealRepository
from app.deals.service import DealService

from app.deals.schema import (
    deal_schema,
    deals_schema,
    create_deal_schema,
    update_deal_schema,
)

deal_bp = Blueprint(
    "deals",
    __name__,
    url_prefix="/deals",
)


@deal_bp.get("")
@jwt_required()
@require_permission("deal.read")
def get_deals():

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

    service = DealService(DealRepository(db))

    if search:
        deals = service.search(search)
    else:
        deals = service.get_all()

    return jsonify(deals_schema.dump(deals))


@deal_bp.get("/<uuid:deal_id>")
@jwt_required()
@require_permission("deal.read")
def get_deal(deal_id):

    db = next(get_db())

    service = DealService(DealRepository(db))

    deal = service.get_by_id(
        deal_id,
    )

    return jsonify(deal_schema.dump(deal))


@deal_bp.post("")
@jwt_required()
@require_permission("deal.create")
def create_deal():

    data = create_deal_schema.load(request.get_json())

    db = next(get_db())

    service = DealService(DealRepository(db))

    deal = service.create_deal(
        data,
    )

    return (
        jsonify(deal_schema.dump(deal)),
        201,
    )


@deal_bp.put("/<uuid:deal_id>")
@jwt_required()
@require_permission("deal.update")
def update_deal(deal_id):

    data = update_deal_schema.load(request.get_json())

    db = next(get_db())

    service = DealService(DealRepository(db))

    deal = service.update_deal(
        deal_id,
        data,
    )

    return jsonify(deal_schema.dump(deal))


@deal_bp.delete("/<uuid:deal_id>")
@jwt_required()
@require_permission("deal.delete")
def delete_deal(deal_id):

    db = next(get_db())

    service = DealService(DealRepository(db))

    service.delete_deal(
        deal_id,
    )

    return (
        jsonify({"message": "Deal deleted successfully."}),
        200,
    )


@deal_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("deal.read")
def get_company_deals(company_id):

    db = next(get_db())

    service = DealService(DealRepository(db))

    deals = service.get_company_deals(
        company_id,
    )

    return jsonify(deals_schema.dump(deals))


@deal_bp.get("/owner/<uuid:owner_id>")
@jwt_required()
@require_permission("deal.read")
def get_owner_deals(owner_id):

    db = next(get_db())

    service = DealService(DealRepository(db))

    deals = service.get_owner_deals(
        owner_id,
    )

    return jsonify(deals_schema.dump(deals))


@deal_bp.get("/lead/<uuid:lead_id>")
@jwt_required()
@require_permission("deal.read")
def get_lead_deals(lead_id):

    db = next(get_db())

    service = DealService(DealRepository(db))

    deals = service.get_lead_deals(
        lead_id,
    )

    return jsonify(deals_schema.dump(deals))
