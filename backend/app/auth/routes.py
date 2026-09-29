# type: ignore
from flask import Blueprint, jsonify, request

from app.auth.schema import login_schema
from app.auth.service import AuthService
from app.auth.utils import generate_access_token
from app.database.session import db_context
from app.users.repository import UserRepository

auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/auth",
)


@auth_bp.post("/login")
def login():

    data = login_schema.load(request.get_json())

    with db_context() as db:

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
