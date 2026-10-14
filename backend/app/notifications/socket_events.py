from flask_socketio import join_room

from flask_jwt_extended import decode_token

from app.core.extensions import socketio


@socketio.on("connect")
def handle_connect(auth):

    if not auth:

        return False

    token = auth.get("token")

    if not token:

        return False

    try:

        decoded = decode_token(token)

        user_id = decoded["sub"]

    except Exception:

        return False

    room = f"user:{user_id}"

    join_room(room)

    print(f"Socket connected: {room}")
