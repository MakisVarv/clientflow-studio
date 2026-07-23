from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required

from app.database.session import get_db

from app.common.permissions import require_permission

from app.companies.repository import CompanyRepository
from app.companies.service import CompanyService


from app.companies.schema import (
    company_schema,
    companies_schema,
    create_company_schema,
    update_company_schema,
)

company_bp = Blueprint(
    "companies",
    __name__,
    url_prefix="/companies",
)


@company_bp.get("")
@jwt_required()
@require_permission("company.read")
def get_companies():

    db = next(get_db())

    repository = CompanyRepository(db)

    service = CompanyService(repository)

    companies = service.get_companies()

    return jsonify(companies_schema.dump(companies))


@company_bp.get("/<company_id>")
@jwt_required()
@require_permission("company.read")
def get_company(company_id):

    db = next(get_db())

    repository = CompanyRepository(db)

    service = CompanyService(repository)

    company = service.get_by_id(company_id)

    return jsonify(company_schema.dump(company))


@company_bp.post("")
@jwt_required()
@require_permission("company.create")
def create_company():

    data = create_company_schema.load(request.json)

    db = next(get_db())

    repository = CompanyRepository(db)

    service = CompanyService(repository)

    company = service.create_company(**data)

    return (
        jsonify(company_schema.dump(company)),
        201,
    )


@company_bp.put("/<uuid:company_id>")
@jwt_required()
@require_permission("company.update")
def update_company(company_id):

    data = update_company_schema.load(request.json)

    db = next(get_db())

    repository = CompanyRepository(db)

    service = CompanyService(repository)

    company = service.update_company(
        company_id=company_id,
        **data,
    )

    return jsonify(company_schema.dump(company))


@company_bp.delete("/<uuid:company_id>")
@jwt_required()
@require_permission("company.delete")
def delete_company(company_id):

    db = next(get_db())

    repository = CompanyRepository(db)

    service = CompanyService(repository)

    service.delete(company_id)

    return (
        jsonify({"message": "Company deleted successfully."}),
        200,
    )
