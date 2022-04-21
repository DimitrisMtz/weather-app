from api import app, request, jsonify, jwt, db
from api.models.User import User
from api.serializers.UserSerializer import UserSerializer
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt

@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = Bcrypt().generate_password_hash(request.json.get("password", None)).decode('utf-8')
    user = User.query.filter_by(username=username).one_or_none()
    if user:
        return jsonify("Username already exists"), 409
    user = User.query.filter_by(email=email).one_or_none()
    if user:
        return jsonify("Email already exists"), 409
    user = User(username, email, password)
    db.session.add(user)
    db.session.commit()
    user = UserSerializer(user).serialize()
    access_token = create_access_token(identity=user)
    return jsonify({
        "access_token": access_token,
        "is_admin": user['is_admin']
    })