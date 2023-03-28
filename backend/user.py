from flask import Blueprint, request
from app import db, session_ids
from bson.objectid import ObjectId
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid

user_api = Blueprint('user_api', __name__)
#url_prefix = /user
@user_api.route("/getuser")
def getUser():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        mylist = db.Users.find_one({"user_id":userid})
        if mylist is None:
            return {"message":"empty_list", "response":"error"}
        return mylist
    elif('session-id' in request.cookies):
        mylist = db.Users.find_one({"email":"jack0@gmail.com"})
        if mylist is None:
            return {"message":"empty_list", "response":"error"}
        return mylist
    else:
        return {"message":"not_logged_in", "response":"error"}
    

@user_api.route("/getuserlist")
def getUserList():
    users = db.Users.find()
    if users.count() == 0:
        return {"message":"list_empty", "response":"error"}
    list_users = list(users)
    json_users = dumps(list_users)
    return json_users

@user_api.route("/postuser", methods=['POST'])
def postUser():
    userid = str(uuid.uuid4())
    data = request.get_json()
    email = data.get("email") #TODO: What is the difference between this and register
    password = generate_password_hash(data.get("password"))
    first_name = data.get("first_name")
    ts = datetime.utcnow()
    ts_mod = datetime.utcnow()
    if "last_name" in data:
        last_name = data.get("last_name")
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"ts":ts,"ts_mod":ts_mod})
        return {"response":"success"}
    db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"ts":ts,"ts_mod":ts_mod})
    return {"response":"success"}

@user_api.route("/deleteuser", methods=['POST'])
def deleteUser():
    data = request.get_json()
    userid = data.get("id")
    query = {"_id":userid}
    newvalues = { "$set": { "ts_mod": datetime.utcnow(),"is_deleted":True}}
    result = db.Users.update_one(query, newvalues)
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message": "user does not exist", "response":"error"}

@user_api.route("/updateuser", methods=['POST'])
def updateUser():
    data = request.get_json()
    userid = data.get("id")
    query = {"_id":userid}
    fields = data.get("fields")
    values = data.get("values")
    update_dict = {}
    for i in range(len(fields)):
        update_dict[fields[i]] = values[i]
    update_dict["ts_mod"] = datetime.utcnow()
    result = db.Users.update_one(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message": "user does not exist", "response":"error"}

account_api = Blueprint('account_api', __name__)

@account_api.route("/getuserlistings", methods=['POST'])
def getUserListings():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        mylist = db.Listings.find({"user_id":userid})
        if mylist.count() == 0:
            return {"message":"empty list"}
        json_list = dumps(list(mylist))
        return json_list
    else:
        return {"message":"not_logged_in", "response":"error"}

@account_api.route("/getuserpayments", methods=['POST'])
def getUserPayments():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        mylist = db.Payments.find({"user_id":userid})
        if mylist.count() == 0:
            return {"message":"empty list"}
        json_list = dumps(list(mylist))
        return json_list
    else:
        return {"message":"not_logged_in", "response":"error"}

@account_api.route("/getuserdatalinks", methods=['POST'])
def getUserDataLinks():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        mylist = db.Devices.find({"user_id":userid},{"data_retrieval_link":1, "_id":0})
        if mylist.count() == 0:
            return {"message":"empty list"}
        json_list = dumps(list(mylist))
        return json_list
    else:
        return {"message":"not_logged_in", "response":"error"}

