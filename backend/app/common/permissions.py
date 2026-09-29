from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt_identity

from app.common.factory import get_user_service
from app.database.session import db_context


def require_permission(permission_name):

    def decorator(fn):

        @wraps(fn)
        def wrapper(*args, **kwargs):

            user_id = get_jwt_identity()

            with db_context() as db:

                service = get_user_service(db)

                allowed = service.has_permission(
                    user_id=user_id,
                    permission_name=permission_name,
                )

                if not allowed:
                    return (
                        jsonify({"message": "Permission denied."}),
                        403,
                    )

            return fn(*args, **kwargs)

        return wrapper

    return decorator
