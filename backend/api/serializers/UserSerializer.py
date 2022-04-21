from api.models import User

class UserSerializer:
    def __init__(self, user):
        self.user = user

    def serialize(self):
        return {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "is_admin": self.user.is_admin,
            "created_at": self.user.created_at,
        }