from flask import Blueprint, request
from app import db
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
    password_hashed = db.Users.find_one({"email":email},{"password":1,"_id":0})
    if password_hashed is None:
        return {"message":"user_not_found"}
    if not check_password_hash(password_hashed, password_plaintext):
        return {"message":"wrong_password"}
    # ......
    return "logged in"

#post register
@auth_api.route("/register", methods=['POST'])
def register():
    # data validation TODO:TEMPORARY
    userid = uuid.uuid4()
    data = request.get_json()
    email = data.get("email")
    password = generate_password_hash(data.get("password"))
    first_name = data.get("first_name")
    ts = datetime.utcnow()
    ts_mod = datetime.utcnow()
    if "last_name" in data:
        last_name = data.get("last_name")
    if db.Users.find_one({"email":email}) is not None:
        return {"message":"email already been registered"}
    userid = uuid.uuid4()
    db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"ts":ts,"ts_mod":ts_mod})
    # ......
    return "registered"

#login callback
@auth_api.route("/callback")
def callback():
    return "callback"

#logout
@auth_api.route("/logout")
def logout():
    return "logged out"
