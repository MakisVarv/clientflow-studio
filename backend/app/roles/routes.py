# type: ignore
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.common.factory import get_role_service
from app.roles.schema import (
    role_schema,
    roles_schema,
    create_role_schema,
    update_role_schema,
    add_permission_schema,
)
from app.permissions.assignment_schema import assign_permissions_schema

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


@role_bp.post("/<role_id>/permissions")  # type: ignore
def assign_permissions(role_id):
    json_data = request.get_json()

    try:
        data = assign_permissions_schema.load(json_data)

    except ValidationError as err:
        return jsonify(err.messages), 400

    service = get_role_service()

    role = service.assign_permissions(
        role_id,
        data["permission_ids"],  # type: ignore
    )

    return role_schema.dump(role), 200


@jwt_required()
@role_bp.put("/<role_id>/permissions")
def add_permission(role_id):

    data = add_permission_schema.load(request.get_json())

    service = get_role_service()

    role = service.add_permission(
        role_id=role_id,
        permission_id=data["permission_id"],
    )

    return jsonify(role_schema.dump(role))


@jwt_required()
@role_bp.delete("/<role_id>/permissions/<permission_id>")
def remove_permission(
    role_id,
    permission_id,
):

    service = get_role_service()

    role = service.remove_permission(
        role_id=role_id,
        permission_id=permission_id,
    )

    return jsonify(role_schema.dump(role))
