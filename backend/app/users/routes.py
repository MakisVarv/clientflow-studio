# type: ignore
from typing import Any

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.common.factory import get_user_service
from app.common.permissions import require_permission
from app.database.session import db_context
from app.users.schema import (
    create_user_schema,
    update_user_schema,
    user_schema,
    users_schema,
)

user_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/users",
)


@user_bp.get("/me")
@jwt_required()
def me():

    user_id = get_jwt_identity()

    with db_context() as db:
        service = get_user_service(db)

        user = service.get_user(user_id)

        return jsonify(user_schema.dump(user))


@user_bp.get("/")
@jwt_required()
@require_permission("users.view")
def get_users():

    page = int(request.args.get("page", 1))
    size = int(request.args.get("size", 10))
    sort = request.args.get("sort", "first_name")
    search = request.args.get("search")
    email = request.args.get("email")

    active_param = request.args.get("active")

    active = None

    if active_param is not None:
        active = active_param.lower() == "true"

    with db_context() as db:

        service = get_user_service(db)

        users = service.get_users(
            page=page,
            size=size,
            sort=sort,
            search=search,
            active=active,
            email=email,
        )

        return jsonify(users_schema.dump(users))


@user_bp.post("/")
def create_user():

    data: dict[str, Any] = create_user_schema.load(request.get_json())

    with db_context() as db:
        service = get_user_service(db)

        user = service.register_user(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            password=data["password"],
            phone=data.get("phone"),
        )

        return (
            jsonify(
                {
                    "id": str(user.id),
                    "message": "User created successfully.",
                }
            ),
            201,
        )


@jwt_required()
@user_bp.get("/<user_id>")
def get_user(user_id):
    with db_context() as db:
        service = get_user_service(db)

        user = service.get_user(user_id)

        return jsonify(user_schema.dump(user))


@jwt_required()
@user_bp.put("/<user_id>")
def update_user(user_id):

    data = update_user_schema.load(request.get_json())
    with db_context() as db:
        service = get_user_service(db)
        service = get_user_service()

        user = service.update_user(
            user_id=user_id,
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone=data["phone"],
        )

        return jsonify(user_schema.dump(user))


@jwt_required()
@user_bp.delete("/<user_id>")
def delete_user(user_id):
    with db_context() as db:
        service = get_user_service(db)

        service.delete_user(user_id)

        return (
            jsonify({"message": "User deleted successfully."}),
            200,
        )


@jwt_required()
@user_bp.delete("/<user_id>/role")
def remove_role(user_id):
    with db_context() as db:
        service = get_user_service(db)

        user = service.remove_role(user_id)

        return jsonify(user_schema.dump(user)), 200
