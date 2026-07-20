# type: ignore
from flask import Blueprint, jsonify, request

from app.auth.schema import login_schema
from app.auth.service import AuthService
from app.common.factory import get_user_service
from app.database.session import get_db
from app.users.repository import UserRepository
from app.auth.utils import generate_access_token

auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/auth",
)


@auth_bp.post("/login")
def login():

    data = login_schema.load(request.get_json())

    db = next(get_db())

    repository = UserRepository(db)

    service = AuthService(repository)

    user = service.login(email=data["email"], password=data["password"])
    access_token = (generate_access_token(user),)

    return jsonify(
        {
            "message": "Login successful.",
            "access_token": access_token,
            "user": {
                "id": str(user.id),
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            },
        }
    )
