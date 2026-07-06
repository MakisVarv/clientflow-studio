from flask import Blueprint, jsonify

from app.database.session import get_db
from app.users.repository import UserRepository
from app.users.service import UserService
from flask import request
from app.common.factory import get_user_service
from app.users.schema import users_schema, create_user_schema
from typing import Any

user_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/users",
)


@user_bp.get("/")
def get_users():
    service = get_user_service()

    users = service.get_users()

    return jsonify(users_schema.dump(users))


@user_bp.post("/")
def create_user():

    data: dict[str, Any] = create_user_schema.load(request.get_json())

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
