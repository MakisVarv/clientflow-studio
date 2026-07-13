from flask import Blueprint, jsonify

from app.database.session import get_db
from app.users.repository import UserRepository
from app.users.service import UserService
from flask import request
from app.common.factory import get_user_service
from app.users.schema import (
    users_schema,
    user_schema,
    create_user_schema,
    update_user_schema,
)
from typing import Any
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

user_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/users",
)


@user_bp.get("/me")
@jwt_required()
def me():

    user_id = get_jwt_identity()

    service = get_user_service()

    user = service.get_user(user_id)

    return jsonify(user_schema.dump(user))


@jwt_required()
@user_bp.get("/")
def get_users():

    page = int(request.args.get("page", 1))

    size = int(request.args.get("size", 10))

    service = get_user_service()

    users = service.get_users(
        page=page,
        size=size,
    )

    return jsonify(users_schema.dump(users))


@user_bp.post("/")
def create_user():

    data: dict[str, Any] = create_user_schema.load(request.get_json())  # type: ignore

    service = get_user_service()

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

    service = get_user_service()

    user = service.get_user(user_id)

    return jsonify(user_schema.dump(user))


@jwt_required()
@user_bp.put("/<user_id>")
def update_user(user_id):

    data = update_user_schema.load(request.get_json())

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

    service = get_user_service()

    service.delete_user(user_id)

    return (
        jsonify({"message": "User deleted successfully."}),
        200,
    )
