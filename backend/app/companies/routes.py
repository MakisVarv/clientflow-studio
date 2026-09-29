from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.companies.repository import CompanyRepository
from app.companies.schema import (
    companies_schema,
    company_schema,
    create_company_schema,
    update_company_schema,
)
from app.companies.service import CompanyService
from app.database.session import db_context

company_bp = Blueprint(
    "companies",
    __name__,
    url_prefix="/companies",
)


@company_bp.get("")
@jwt_required()
@require_permission("company.read")
def get_companies():

    with db_context() as db:

        repository = CompanyRepository(db)

        service = CompanyService(repository)

        companies = service.get_companies()

        return jsonify(companies_schema.dump(companies))


@company_bp.get("/<uuid:company_id>")
@jwt_required()
@require_permission("company.read")
def get_company(company_id):

    with db_context() as db:

        repository = CompanyRepository(db)

        service = CompanyService(repository)

        company = service.get_by_id(company_id)

        return jsonify(company_schema.dump(company))


@company_bp.post("")
@jwt_required()
@require_permission("company.create")
def create_company():

    data = create_company_schema.load(request.json)

    with db_context() as db:

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

    with db_context() as db:

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

    with db_context() as db:

        repository = CompanyRepository(db)

        service = CompanyService(repository)

        service.delete(company_id)

        return (
            jsonify({"message": "Company deleted successfully."}),
            200,
        )
