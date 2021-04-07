from models import db

# New Recommendations Model
class NewRecs(db.Model):
    __tablename__ = 'new_recs'
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer)
    bid = db.Column(db.Integer)
    prediction = db.Column(db.Float)

    def __init__(self, userid, bid, prediction):
        self.userid = userid
        self.bid = bid
        self.prediction = prediction