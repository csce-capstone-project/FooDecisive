# Useful imports
from flask import Flask, jsonify, make_response, render_template, request, flash, redirect, session, url_for, Response, json
from flask_cors import CORS, cross_origin;
from flask_sqlalchemy import SQLAlchemy;
import flask_praetorian
import requests;
from markupsafe import escape;
from flask_user import login_required, UserManager, UserMixin
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import event, create_engine, inspect, DDL, func
from random import seed, random
import uuid
from uuid import uuid1
import xmltodict
import urllib.request as urllib2
from urllib.parse import quote
import json
import string 
import random 
import uuid
from functools import wraps
import os
from datetime import timedelta

# App and DB initialized in __init__.py 
import models
app = models.app
db = models.db

# IMPORT MODELS
from models.user import User
from models.review import Reviews
from models.recs import NewRecs
from models.business_detail import BusinessDetail
from models.favorites import Favorites
from models.yelp_reviews import YelpReviews


guard = flask_praetorian.Praetorian()
guard.init_app(app, User)


# custom functions
def my_random_string(string_length=22):
    """Returns a random string of length 22 (b/c all yelp id's are this length)"""

# Convert UUID format to a Python string.
    random = str(uuid.uuid4())

# Make all characters uppercase.
    random = random.upper()

# Remove the UUID '-'.
    random = random.replace("-","")

# Return the random string.
    return random[0:string_length]


def customid():
    idquery = db.session.query(Reviews).order_by(Reviews.col_id.desc()).first()

    if not idquery:
        last_id = 0
    else:  
        last_id = int(idquery.col_id)

    next_id = int(last_id) + 1
    return next_id



def customid2():
    idquery = db.session.query(YelpReviews).order_by(YelpReviews.col_id.desc()).first()

    if not idquery:
        last_id = 0
    else:  
        last_id = int(idquery.col_id)

    next_id = int(last_id) + 1
    return next_id

def user_id(userid):
    if db.session.query(Reviews).filter(Reviews.username == userid).count() == 0:
        idquery = db.session.query(Reviews).order_by(Reviews.userid.desc()).first()

        # if not idquery:
        #     last_id = 0
        # else:  
        #     last_id = int(idquery.userid)
            # last_id = my_random_string(22)
        
        last_id = int(idquery.userid)
        next_id = int(last_id) + 1

        # next_id = last_id
        return next_id
    else:
        idquery = db.session.query(Reviews).filter(Reviews.username == userid).first()
        idquery_old = idquery.userid
        return idquery_old


def uid(userid):
    if db.session.query(YelpReviews).filter(YelpReviews.username == userid).count() == 0:
        idquery = db.session.query(YelpReviews).order_by(YelpReviews.userid.desc()).first()

        # if not idquery:
        #     last_id = 0
        # else:  
        #     last_id = int(idquery.userid)
        #     # last_id = my_random_string(22)
        
        last_id = int(idquery.userid)
        next_id = int(last_id) + 1

        # next_id = last_id
        return next_id
    else:
        idquery = db.session.query(YelpReviews).filter(YelpReviews.username == userid).first()
        idquery_old = idquery.userid
        return idquery_old



def idcounter():
    iding = db.session.query(BusinessDetail).order_by(BusinessDetail.b_id.desc()).first()
    if not iding:
        last_id = 0
    else:
        last_id = int(iding.b_id)
    next_id = int(last_id) + 1
    return next_id


# API
@app.route('/test')
def getMessage():
    return {'message': 'API works!'}



# registration endpoint
@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        request_data = json.loads(request.data)
        print(request_data['username'])

        username = request_data['username']
        password = request_data['password']

        # password_hash = generate_password_hash(password)
        password_hash = guard.hash_password(password)

        if db.session.query(User).filter(User.username == username).count() == 0:
            user = User(username, password, password_hash)
            db.session.add(user)
            db.session.commit()
            session['username'] = user.username
            # REFACTOR TO USE THIS 'user_id' when ratings are created
            session['user_id'] = user_id(session.get('username'))
            session['logged_in'] = True

            return {'status': 'success'}
        else:
            return {'status': 'fail'}
    else:
        return {'status': 'fail'}



# login page
@app.route('/login', methods=["GET", "POST"])
def sign_in():
    if request.method == 'POST':
        req = request.get_json(force=True)
        # username_entered = request.form['username']
        # password_entered = request.form['password']
        # request_data = json.loads(request.data)
        # print(request_data['username'])

        # username_entered = request_data['username']
        # password_entered = request_data['password']


        username_entered = req.get('username', None)
        password_entered = req.get('password', None)

        user = db.session.query(User).filter(User.username == username_entered).first()
        if user is not None:
            user = guard.authenticate(username_entered, password_entered)
            print(user.username)
            # print(flask_praetorian.current_user().username)
            ret = {'access_token': guard.encode_jwt_token(user)}
            # session['username'] = user.username
            # session['user_id'] = user_id(session.get('username'))
            # session['logged_in'] = True
            return ret, 200
        return {'status': 'NO USER FOUND'}
    else:
        return {'status': 'NO USER FOUND'}


@app.route('/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200



@app.route('/protected')
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return {"message": f'{flask_praetorian.current_user().username}'}


# sign-out page
@app.route('/logout', methods=["GET", "POST"])
def sign_out():
    if session.get('username') is not None:
        if request.method == 'POST':
            session.pop('username', None)
            return {'loggedIn': False}
        else:
            return {'loggedIn': False}
    else:
        return {'loggedIn': False}



@app.route('/rate', methods=["GET", "POST"])
@flask_praetorian.auth_required
def post_rate():
    print(flask_praetorian.current_user().username)
    if flask_praetorian.current_user().username is not None:
        if request.method == 'POST':
            req = request.get_json(force=True)


            col_id = customid()
            username = flask_praetorian.current_user().username
            reviewid = my_random_string(22)
            userid = user_id(username)
            business_id = req.get('businessid', None)
            rating = req.get('rating', None)
            if db.session.query(func.max(Reviews.bid)).scalar() is None:
                bid = 1
            else:
                bid = db.session.query(func.max(Reviews.bid)).scalar() + 1
            text = req.get('review', None)

            # print(f'{rating}, {business_id}, {text}')

            if db.session.query(BusinessDetail).filter(BusinessDetail.business_id == business_id).count() == 0:
                bid = idcounter()
                bizdata = BusinessDetail(bid, business_id)
                db.session.add(bizdata)
                db.session.commit()
            else:
                bizfilter = db.session.query(BusinessDetail).filter(BusinessDetail.business_id == business_id).first()
                bid = bizfilter.b_id

            # userid = uid(username)
            data = Reviews(col_id, reviewid, userid, business_id, rating, text, bid, username)
            db.session.add(data)
            db.session.commit()

            col_id = customid2()
            data1 = YelpReviews(col_id, reviewid, userid, business_id, rating, bid, username)
            db.session.add(data1)
            db.session.commit()

            return {'Status': 'Success'}
    else:
        return {'Status': 'Failed'}



@app.route('/get_favorites', methods=['GET', 'POST'])
@flask_praetorian.auth_required
def get_favorites():
    if flask_praetorian.current_user().username is not None:
        userid = db.session.query(User).filter(User.username == flask_praetorian.current_user().username).with_entities(User.id).first()


        business_id = request.args.get('business_id')

        if db.session.query(Favorites).filter(Favorites.userid == userid).count() == 0:
            return json.dumps({
                'Status': 'Success',
                'favorite': False
            })
        else:
            businesses = db.session.query(Favorites).filter(Favorites.userid == userid).with_entities(Favorites.business_id).all()
            print(businesses)
            return json.dumps({
                'businesses': businesses
            })



@app.route('/favorites', methods=['GET', 'POST'])
@flask_praetorian.auth_required
def favorite():
    if flask_praetorian.current_user().username is not None:
        # userid = user_id(flask_praetorian.current_user().username)
        # userid = my_random_string(flask_praetorian.current_user().username)
        userid = db.session.query(User).filter(User.username == flask_praetorian.current_user().username).with_entities(User.id).first()
        userid = userid[0]
        
        # Should query from User table instead
        # Apply a hashed username to 

        if request.method == 'POST':
            req = request.get_json(force=True)

            business_id = req.get('businessid', None)
            option = req.get('addFavorite', None)


            if option == 'add':
                if db.session.query(Favorites).filter(Favorites.userid == userid, Favorites.business_id == business_id).count() == 0:
                    data = Favorites(userid, business_id)
                    db.session.add(data)
                    db.session.commit()

                    return {'Status': 'Success'}
                else:
                    return {'Status': 'Failed'}
            else:
                if db.session.query(Favorites).filter(Favorites.userid == userid, Favorites.business_id == business_id).count() != 0:
                    db.session.delete(db.session.query(Favorites).filter(Favorites.userid == userid, Favorites.business_id == business_id).first())
                    db.session.commit()
                    return {'Status': 'Success'}
                else:
                    return {'Status': 'Failed'}
        else:
            business_id = request.args.get('business_id')

            if db.session.query(Favorites).filter(Favorites.userid == userid, Favorites.business_id == business_id).count() == 0:
                return json.dumps({
                    'Status': 'Success',
                    'favorite': False
                })
            else:
                return json.dumps({
                    'Status': 'Success',
                    'favorite': True
                })
    else:
        return {'Status': 'Failed'}

@app.route('/get_reviews', methods=['GET', 'POST'])
@flask_praetorian.auth_required
def get_review():
    if flask_praetorian.current_user().username is not None:
        userid = db.session.query(Reviews).filter(Reviews.username == flask_praetorian.current_user().username).with_entities(Reviews.userid).first()
        if request.method == 'GET':
            revs = []
            for review in db.session.query(Reviews).filter(Reviews.userid == userid).with_entities(Reviews.rating, Reviews.business_id, Reviews.text, Reviews.reviewid):
                print(review)
                rating, business_id, text, review_id = review
                revs.append({'rating': rating, 'business_id': business_id, 'text': text, 'review_id': review_id})
            print(revs)
            #     revs.append(review.__dict__)
            # print(revs)
            # print(json.dumps(revs))
            return jsonify(revs)

@app.route("/recs", methods=['GET'])
@flask_praetorian.auth_required
def getrecs():
    if request.method == 'GET':
        userid = uid(flask_praetorian.current_user().username)
        recs = db.session.query(NewRecs).filter(NewRecs.userid == userid).all()
        recs_list = []
        for i in recs:
            # if i.book_id == 4:
            res_id = db.session.query(BusinessDetail).filter(BusinessDetail.b_id == i.bid).first().business_id
            recs_list.append(res_id)
            print(recs_list)
        # bk = []
        # for i in recs_list:
        #     response_string = 'https://www.goodreads.com/book/show?id='+ str(i) + '&key=Ev590L5ibeayXEVKycXbAw'
        #     xml = urllib2.urlopen(response_string)
        #     data = xml.read()
        #     xml.close()
        #     data = xmltodict.parse(data)
        #     gr_data = json.dumps(data)
        #     goodreads_fnl = json.loads(gr_data)
        #     gr = goodreads_fnl['GoodreadsResponse']['book']
        #     bk.append(dict(id=gr['id'], book_title=gr['title'], image_url=gr['image_url']))

        # book = dict(work=bk)
        # return render_template('recs.html', recs = book)
        return json.dumps({
                'recs': recs_list
            })
    else:
        return {'Status': 'Failed'}

@app.route("/delete_review", methods=['POST'])
@flask_praetorian.auth_required
def delete_review():
    if request.method == 'POST':
        userid = uid(flask_praetorian.current_user().username)
        req = request.get_json(force=True)
        review_id = req.get('review_id', None)

        if db.session.query(Reviews).filter(Reviews.userid == userid, Reviews.reviewid == review_id).count() != 0:
            db.session.delete(db.session.query(Reviews).filter(Reviews.userid == userid, Reviews.reviewid == review_id).first())
            db.session.commit()
            return {'Status': 'Success'}
        else:
            return {'Status': 'Failed'}
    else:
        return {'Status': 'Failed'}

@app.route("/edit_review", methods=['POST'])
@flask_praetorian.auth_required
def edit_review():
    if request.method == 'POST':
        userid = uid(flask_praetorian.current_user().username)
        req = request.get_json(force=True)

        review_id = req.get('review_id', None)
        rating = req.get('rating', None)
        text = req.get('review', None)

        if db.session.query(Reviews).filter(Reviews.userid == userid, Reviews.reviewid == review_id).count() != 0:
            entry = db.session.query(Reviews).filter(Reviews.userid == userid, Reviews.reviewid == review_id).first()
            entry.rating = rating
            entry.text = text
            db.session.commit()
            return {'Status': 'Success'}
        else:
            return {'Status': 'Failed'}

if __name__ == '__main__':
    app.debug = True
    # app.permanent_session_lifetime = timedelta(minutes=1)
    # app.run(host='0.0.0.0', port=5000)
    app.run()


