from models import db


# User Model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200))
    password = db.Column(db.String(200))
    password_hash = db.Column(db.String(200))

    def __init__(self, username, password, password_hash):
        self.username = username
        self.password = password
        self.password_hash = password_hash