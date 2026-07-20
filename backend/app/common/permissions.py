from functools import wraps

from flask import jsonify

from flask_jwt_extended import get_jwt_identity
from app.common.factory import get_user_service


def require_permission(permission_name):

    def decorator(fn):

        @wraps(fn)
        def wrapper(*args, **kwargs):
            print("Decorator executed")

            user_id = get_jwt_identity()
            print("JWT:", user_id)

            service = get_user_service()

            user = service.get_user(user_id)

            allowed = service.has_permission(
                user_id=user_id,
                permission_name=permission_name,
            )
            print("Allowed:", allowed)

            if not allowed:
                return (
                    jsonify({"message": "Permission denied."}),
                    403,
                )

            return fn(*args, **kwargs)

        return wrapper

    return decorator
