from flask import Blueprint, request, current_app
from app import db, session_ids
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid

auth_api = Blueprint('auth_api', __name__)
#url_prefix = /auth

#post login
@auth_api.route("/login", methods=['POST'])
def login():
    # data validation
    data = request.get_json()
    email = data.get("email")
    password_plaintext = data.get("password")
    user = db.Users.find_one({"email":email})
    if user is None:
        return {"response":"error", "message":"user_not_found"}
    password_hashed = user.get("password")
    if not check_password_hash(password_hashed, password_plaintext):
        return {"response":"error", "message":"wrong_password"}
    
    # create session id
    session_id = generate_random_session_id()
    session_ids[session_id] = user.get("_id")
    response = current_app.make_response({"response":"success"})
    response.set_cookie('session-id', session_id)
    return response

#post register
@auth_api.route("/register", methods=['POST'])
def register():
    # data validation TODO:TEMPORARY
    userid = str(uuid.uuid4())
    data = request.get_json()
    email = data.get("email")
    password = generate_password_hash(data.get("password"))
    first_name = data.get("first_name")
    ts = datetime.datetime.utcnow()
    ts_mod = datetime.datetime.utcnow()
    if db.Users.find_one({"email":email}) is not None:
        return {"response":"error", "message":"email_has_been_used"}
    if "last_name" in data:
        last_name = data.get("last_name")
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"ts":ts,"ts_mod":ts_mod})
    else:
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"ts":ts,"ts_mod":ts_mod})
    return {"response":"success"}


#login callback
@auth_api.route("/callback")
def callback():
    return "callback"

#logout
@auth_api.route("/logout")
def logout():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        del session_ids[request.cookies.get('session-id')]
    #clear cookie from response
    response = current_app.make_response({"results": "success"})
    response.set_cookie('session-id', '', expires=0)
    return response

def generate_random_session_id():
    return str(uuid.uuid4())
