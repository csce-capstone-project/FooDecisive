from models import db

# Reviews Model
class YelpReviews(db.Model):
    __tablename__ = 'yelp_reviews'
    col_id = db.Column(db.Integer, primary_key=True)
    reviewid = db.Column(db.String(200))
    userid = db.Column(db.Integer, autoincrement=True)
    business_id = db.Column(db.String(200))
    rating = db.Column(db.Integer)
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
