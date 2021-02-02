from models import db


# Businesses Model
class BusinessDetail(db.Model):
    __tablename__ = 'biz_detail'
    b_id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.String(200))

    def __init__(self, b_id, business_id):
        self.b_id = b_id
        self.business_id = business_id