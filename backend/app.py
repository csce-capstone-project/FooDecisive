# Useful imports
from flask import Flask, jsonify, make_response, render_template, request, flash, redirect, session, url_for, Response;
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



# API
@app.route('/test')
def getMessage():
    return {'message': 'API works!'}

if __name__ == '__main__':
    app.debug = True
    app.run()