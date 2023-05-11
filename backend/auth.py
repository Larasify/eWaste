# import packages and modules
from flask import Blueprint, request, current_app
from flask_cors import cross_origin

from app import db, session_ids
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid
import re
from user import addNotificationLocal

# define a blueprint for authentication APIs
auth_api = Blueprint('auth_api', __name__)

#url_prefix = /auth

# post login
@auth_api.route("/login", methods=['POST'])
@cross_origin(methods=['POST'], supports_credentials=True, headers=['Content-Type', 'Authorization'], origin='*')
def login():
    # extract email and password from request body
    data = request.get_json()
    email = data.get("email")
    password_plaintext = data.get("password")
    # look up user in the collection
    user = db.Users.find_one({"email":email})

    # check if user is not found/deleted and return error
    if user is None:
        return {"response":"error", "message":"user_not_found"}
    if user.get("is_deleted"):
        return {"message":"record deleted", "response":"error"}

    # check if password is correct
    password_hashed = user.get("password")
    if not check_password_hash(password_hashed, password_plaintext):
        addNotificationLocal(user.get("_id"), "Failed Login Attempt", "Failed login attempt at " + str(datetime.datetime.utcnow()))
        return {"response":"error", "message":"wrong_password"}

    # create session id
    session_id = generate_random_session_id()
    session_ids[session_id] = user.get("_id")
    response = current_app.make_response({"response":"success"})
    response.set_cookie('session-id', session_id, max_age=60*60*24*365*2)
    #if a user has a Last Successful Login notification, delete it
    db.Users.update_one({"_id":user.get("_id")}, {"$pull":{"notifications":{"title":"Last Successful Login"}}})
    #add a new Last Successful Login notification
    addNotificationLocal(user.get("_id"), "Last Successful Login", "Last successful login at " + str(datetime.datetime.utcnow()))
    return response

# post register
@auth_api.route("/register", methods=['POST'])
def register():
    # generate a random uuid for the new user
    userid = str(uuid.uuid4())
    # extract data from request body
    data = request.get_json()
    email = data.get("email")
    # validate the email
    if not validate_email(email):
        return {"response":"error", "message":"invalid_email"}
    # hash the password
    password = generate_password_hash(data.get("password"))
    first_name = data.get("first_name")
    ts = datetime.datetime.utcnow()
    ts_mod = datetime.datetime.utcnow()
    phone_no = data.get("phone_no")

     # set the user privilege (default "user")
    if "privilege" in data:
        privilege = data.get("privilege")
    else:
        privilege = "user"
    # check if the email has been used
    if db.Users.find_one({"email":email}) is not None:
        return {"response":"error", "message":"email_has_been_used"}
    # insert the new user
    if "last_name" in data:
        last_name = data.get("last_name")
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"phone_no":phone_no,"privilege":privilege,"ts":ts,"ts_mod":ts_mod, "is_deleted":False})
    else:
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"phone_no":phone_no,"privilege":privilege,"ts":ts,"ts_mod":ts_mod, "is_deleted":False})
    return {"response":"success"}


# login callback
@auth_api.route("/callback")
def callback():
    return "callback"

# logout
@auth_api.route("/logout")
def logout():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        del session_ids[request.cookies.get('session-id')]
    #clear cookie from response
    response = current_app.make_response({"response": "success"})
    response.set_cookie('session-id', '', expires=0)
    return response

# generate random session id
def generate_random_session_id():
    return str(uuid.uuid4())

# validate an email
def validate_email(email):
    # check if email is a valid format
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))

# validate a password
def validate_password(password):
    # check if password meets minimum requirements
    min_length = 6
    return len(password) >= min_length

# check the priviledge level of an user
def userisadminorstaff(userid):
    user = db.Users.find_one({"_id":userid})
    if user is None:
        return False
    if user.get("privilege") == "admin" or user.get("privilege") == "staff":
        return True
    return False
