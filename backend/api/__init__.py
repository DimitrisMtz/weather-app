import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

jwt = JWTManager(app)
db = SQLAlchemy(app)

from api.models import  User, City
migrate = Migrate(app, db)

from api.routes import login, register, city