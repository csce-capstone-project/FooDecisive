# FooDecisive
A self-serving restaurant recommender system with a focus on rich restaurant recommendations and user experience

## Running on your machine
1. Clone the repository to your machine
2. Navigate to the frontend directory and run `npm install`
3. Navigate to the backend directory and run `python3 pip install -r requirements.txt`
4. Run the client: `npm start`
5. Go into the python shell in your backend directory and run: `from app import db` and `db.create_all()` to create the models (assuming a postgres setup).   
6. Run the server: `python3 app.py`
7. You will need to get your own Yelp, wit.ai, and Google Maps API keys and include them in a .env file

## Project Checklist
### Frontend
- [x] Create React Skeleton
- [x] Implement NavBar
- [x] Home Page
- [x] Search Page
- [x] Restaurant Detail Page
- [x] Restaurant Recommendations Page
- [x] Login Page
- [x] Registration Page
- [x] Incorporate Yelp Fusion API to retrieve JSON data about businesses
- [x] Integrate Google Maps API into Restaurant Detail Page
- [x] Deploy Frontend to Heroku

### Backend/Database
- [x] User Authentication
- [x] Generating User Sessions
- [x] Backend routing
- [x] Setup PostgreSQL database and populate with review data
- [x] Create models/schemas for data
- [x] Deploy backend flask to AWS EBS and Postgres to RDS instance

### Machine Learning/Recommender System
- [x] EDA of Yelp Datasets
- [x] Structure Datasets
- [x] Recommendation Algorithm using PySpark
- [x] Establish JDBC connection from Databricks to Remote Postgres
- [x] Develop a conversational chatbot using DialogFlow, wit.ai, or IBM Watson