from api import app, jsonify, sock
from flask_jwt_extended import jwt_required, current_user

@sock.route("/city")
@jwt_required()
def get_weather(ws):
    while True:
        text = ws.receive()
        ws.send(jsonify(current_user.city.get_weather()))