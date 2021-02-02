from flask import Flask, jsonify, make_response, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)


# SET CONSTANTS AND DB CONFIG
ENV = 'dev'

# CREATE THESE TWO VARIABLES AS ENVIRONMENT VARIABLES ON YOUR MACHINE
USERNAME = os.environ.get('POSTGRES_USER')
PASS = os.environ.get('POSTGRES_PASS')

# LOCAL POSTGRES DB URI WITH 'foodecisive' BEING THE DB NAME. REQUIRES POSTGRES SETUP.  
LOCAL_DB_URL = f'postgresql://{USERNAME}:{PASS}@localhost/foodecisive_db'
PROD_DB_URL = ''
SECRET_KEY = os.environ.get('SECRET_KEY')

# ENV OR PROD MODES
if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = LOCAL_DB_URL
else:
    app.debug = False
    # app.config['SQLALCHEMY_DATABASE_URI'] = ''

# AUXILARY VARIABLES
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# INITIALIZE DATABASE OBJECT
db = SQLAlchemy(app)
