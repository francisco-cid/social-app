from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")
CORS(app)
app.config['JSON_SORT_KEYS'] = False
app.secret_key = "bad_secret_key"

# Use the following line for prod db server
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",
#                                                        'postgresql://postgres:1234@35.224.250.226:5432/postgres')

#Jason db connection line
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",
#                                                        'postgresql://postgres:1234@localhost:1234/threeplus')

#Francisco db connection line
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",
                                                       'postgresql://postgres:1234@localhost/threeplus')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # to suppress a warning message
db = SQLAlchemy(app)


# # ------------
# # Users
# # ------------
class User(db.Model):
    """
    Users class inherits from db.Model
    db.Model is an object coming from SQLAlchemy
    Output: creates Users entity (table) to be added to the database
    """
    __tablename__ = 'user'

    user_id = db.Column(db.Integer, nullable=False, primary_key=True)
    username = db.Column(db.String(500), nullable=False)
    email = db.Column(db.String(500), nullable=False)
    password = db.Column(db.String(500), nullable=False)
    first_name = db.Column(db.String(500), nullable=False)
    last_name = db.Column(db.String(500), nullable=True)
    display_name = db.Column(db.String(500), nullable=False)
    body_type = db.Column(db.Integer, nullable=True)
    height = db.Column(db.Integer, nullable=True)
    weight = db.Column(db.Integer, nullable=True)
    birth_date = db.Column(db.DateTime, nullable=False)
    gender = db.Column(db.String(500), nullable=False)
    pronouns = db.Column(db.String(500), nullable=True)
    gender_pref = db.Column(db.Integer, nullable=True)
    sex_position = db.Column(db.String(500), nullable=True)
    std_date = db.Column(db.DateTime, nullable=True)
    have_std = db.Column(db.Boolean, nullable=True)
    std_desc = db.Column(db.String(500), nullable=True)
    prof_desc = db.Column(db.Text, nullable=True)
    avatar_photo = db.Column(db.String(500), nullable=True)

class Photo(db.Model):
    __tablename__='photo'

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, primary_key=True)
    url = db.Column(db.String, nullable=False)
    private = db.Column(db.Boolean, nullable=False)

class SocialHandle(db.Model):
    __tablename__ = 'social_handle'

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    platform = db.Column(db.String, nullable=False)
    handle = db.Column(db.String, nullable=False)

class GroupUser(db.Model):
    __tablename__ = 'group_user'
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    group_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String, nullable=False)
    votes = db.Column(db.Integer, nullable=True)
    invited_by = db.Column(db.Integer, nullable=True)
    admin = db.Column(db.Boolean, nullable=False)

class Vote(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    group_id = db.Column(db.Integer, nullable=False)
    candidate = db.Column(db.Integer, nullable=False) #user_id of user being voted one
    voter = db.Column(db.Integer, nullable=False) #user_id of user voting
    vote = db.Column(db.Boolean, nullable=False) #True if voter has voted, False if voter has not

class Group(db.Model):
    __tablename__ = 'group'
    group_id = db.Column(db.Integer, nullable=False, primary_key=True)
    group_name = db.Column(db.String(500), nullable=False)
    time = db.Column(db.DateTime(500), nullable=False)
    group_desc = db.Column(db.Text, nullable=True)
    gender_pref = db.Column(db.Integer, nullable=True)
    body_pref = db.Column(db.Integer, nullable=True)
    size = db.Column(db.Integer, nullable=False)
    max_size = db.Column(db.Integer, nullable=True)
