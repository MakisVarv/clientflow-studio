from flask import Blueprint, jsonify, request

from app.common.factory import get_role_service
from app.roles.schema import (
    role_schema,
    roles_schema,
    create_role_schema,
    update_role_schema,
)

role_bp = Blueprint(
    "roles",
    __name__,
    url_prefix="/roles",
)


@role_bp.get("/")
def get_roles():

    service = get_role_service()

    roles = service.get_roles()

    return jsonify(roles_schema.dump(roles))


@role_bp.get("/<role_id>")
def get_role(role_id):

    service = get_role_service()

    role = service.get_role(role_id)

    return jsonify(role_schema.dump(role))


@role_bp.post("/")
def create_role():

    data = create_role_schema.load(request.get_json())

    service = get_role_service()

    role = service.create_role(
        name=data["name"],
        description=data.get("description"),
    )

    return (
        jsonify(role_schema.dump(role)),
        201,
    )


@role_bp.put("/<role_id>")
def update_role(role_id):

    data = update_role_schema.load(request.get_json())

    service = get_role_service()

    role = service.update_role(
        role_id=role_id,
        name=data["name"],
        description=data.get("description"),
    )

    return jsonify(role_schema.dump(role))


@role_bp.delete("/<role_id>")
def delete_role(role_id):

    service = get_role_service()

    service.delete_role(role_id)

    return (
        jsonify({"message": "Role deleted successfully."}),
        200,
    )
