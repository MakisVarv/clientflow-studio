from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flasgger import Swagger
from flask_marshmallow import Marshmallow

db = SQLAlchemy()

migrate = Migrate()

jwt = JWTManager()

swagger = Swagger()
ma = Marshmallow()

socketio = SocketIO(
    cors_allowed_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
)


def register_extensions(app):

    db.init_app(app)

    migrate.init_app(app, db)
    ma.init_app(app)
    jwt.init_app(app)

    swagger.init_app(app)

    CORS(app)

    socketio.init_app(app)
