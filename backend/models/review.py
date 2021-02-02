from models import db

# Reviews Model
class Reviews(db.Model):
    __tablename__ = 'reviews'
    col_id = db.Column(db.Integer, primary_key=True)
    reviewid = db.Column(db.String(200))
    userid = db.Column(db.String(200))
    business_id = db.Column(db.String(200))
    rating = db.Column(db.Integer)
    text = db.Column(db.Text())
    bid = db.Column(db.Integer)
    username = db.Column(db.String(200))

    def __init__(self, col_id, reviewid, userid, business_id, rating, text, bid, username):
        self.col_id = col_id
        self.userid = userid
        self.rating = rating
        self.business_id = business_id
        self.bid = bid
        self.reviewid = reviewid
        self.username = username
        self.text = text
