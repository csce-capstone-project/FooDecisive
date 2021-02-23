from flask import Flask, jsonify, make_response, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS, cross_origin;
from dotenv import load_dotenv

from pathlib import Path  # Python 3.6+ only
env_path = Path('..') / '.env'
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
# CORS(app)
cors = CORS()


# SET CONSTANTS AND DB CONFIG

ENV = 'prod'


# CREATE THESE TWO VARIABLES AS ENVIRONMENT VARIABLES ON YOUR MACHINE
USERNAME = os.getenv('POSTGRES_USER')
PASS = os.getenv('POSTGRES_PASS')

PROD_USER = os.getenv('PROD_USER')
PROD_PASS = os.getenv('PROD_PASS')

# LOCAL POSTGRES DB URI WITH 'foodecisive' BEING THE DB NAME. REQUIRES POSTGRES SETUP.  
LOCAL_DB_URL = f'postgresql://{USERNAME}:{PASS}@localhost/foodecisive_db'
PROD_DB_URL = f'postgresql://{PROD_USER}:{PROD_PASS}@database-1.c2yb5pjmfzya.us-east-2.rds.amazonaws.com/postgres'

SECRET_KEY = os.environ.get('SECRET_KEY')


# ENV OR PROD MODES
if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = LOCAL_DB_URL
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = PROD_DB_URL

# AUXILARY VARIABLES
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

# INITIALIZE DATABASE OBJECT
db = SQLAlchemy(app)

cors.init_app(app)
