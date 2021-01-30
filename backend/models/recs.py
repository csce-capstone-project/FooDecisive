from models import db

# New Recommendations Model
class NewRecs(db.Model):
    __tablename__ = 'new_recs'
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(200))
    business_id = db.Column(db.String(200))
    prediction = db.Column(db.Float)

    def __init__(self, userid, business_id, prediction):
        self.userid = userid
        self.business_id = business_id
        self.prediction = prediction