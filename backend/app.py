# Useful imports
from flask import Flask, jsonify, make_response, render_template, request, flash, redirect, session, url_for, Response, json
from flask_cors import CORS, cross_origin;
from flask_sqlalchemy import SQLAlchemy;
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

# App and DB initialized in __init__.py 
import models
app = models.app
db = models.db

# IMPORT MODELS
from models.user import User
from models.review import Reviews
from models.recs import NewRecs
from models.business_detail import BusinessDetail

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

        password_hash = generate_password_hash(password)

        if db.session.query(User).filter(User.username == username).count() == 0:
            user = User(username, password, password_hash)
            db.session.add(user)
            db.session.commit()
            session['username'] = user.username
            # REFACTOR TO USE THIS 'user_id' when ratings are created
            session['user_id'] = user_id(session.get('username'))

            return {'201': 'SUCCESS'}
        else:
            return {'201': 'FAIL'}
    else:
        return {'201': 'FAIL'}








if __name__ == '__main__':
    app.debug = True
    app.run()


