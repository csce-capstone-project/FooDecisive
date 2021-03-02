from models import db


# Businesses Model
class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer)
    business_id = db.Column(db.String(200))

    def __init__(self, userid, business_id):
        self.userid = userid
        self.business_id = business_id