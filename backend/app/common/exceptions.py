from flask import jsonify
from marshmallow import ValidationError


def register_error_handlers(app):
    @app.errorhandler(ValidationError)
    def handle_validation_error(error):

        return (
            jsonify(
                {
                    "success": False,
                    "message": "Validation failed.",
                    "errors": error.messages,
                }
            ),
            400,
        )

    @app.errorhandler(ValueError)
    def handle_value_error(error):

        return (
            jsonify(
                {
                    "success": False,
                    "message": str(error),
                }
            ),
            400,
        )
