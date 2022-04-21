from api import app, request, jsonify, jwt
from api.models.User import User
from api.serializers.UserSerializer import UserSerializer
from flask_jwt_extended import create_access_token, jwt_required, current_user

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401
    user = UserSerializer(user).serialize()
    access_token = create_access_token(identity=user)
    return jsonify({
        "access_token": access_token,
        "is_admin": user['is_admin']
    })

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user['id']

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

@app.route("/who_am_i", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(current_user.username)