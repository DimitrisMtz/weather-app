from api import db, func
from flask_bcrypt import Bcrypt

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
    
    def check_password(self, password):
        return Bcrypt().check_password_hash(self.password, password)
