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


def user_id(userid):
    if db.session.query(Reviews).filter(Reviews.username == userid).count() == 0:
        idquery = db.session.query(Reviews).order_by(Reviews.userid.desc()).first()

        if not idquery:
            last_id = 0
        else:  
            last_id = my_random_string(22)

        next_id = last_id
        return next_id
    else:
        idquery = db.session.query(Reviews).filter(Reviews.username == userid).first()
        idquery_old = idquery.userid
        return idquery_old



# API
@app.route('/test')
def getMessage():
    return {'message': 'API works!'}



# registration endpoint
@app.route('/api/register', methods=["GET", "POST"])
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
@app.route('/api/login', methods=["GET", "POST"])
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


@app.route('/api/refresh', methods=['POST'])
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



@app.route('/api/protected')
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
@app.route('/api/logout', methods=["GET", "POST"])
def sign_out():
    if session.get('username') is not None:
        if request.method == 'POST':
            session.pop('username', None)
            return {'loggedIn': False}
        else:
            return {'loggedIn': False}
    else:
        return {'loggedIn': False}



# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     print("Hello from catch all")
#     if path != "" and os.path.exists(os.path.join('..','build',path)):
#         return app.send_static_file(path)
#     else:
#         return app.send_static_file('index.html')



if __name__ == '__main__':
    app.debug = True
    # app.permanent_session_lifetime = timedelta(minutes=1)
    app.run(host='0.0.0.0', port=5000)


