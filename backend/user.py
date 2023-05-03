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
        user_info = db.Users.find_one({"_id":userid})
        if user_info is None:
            return {"message":"empty_list", "response":"error"}
        if user_info.get("is_deleted"):
            return {"message":"record deleted", "response":"error"}
        return {"response":"success", "user_info":user_info}
    elif('session-id' in request.cookies):
        user_info = db.Users.find_one({"email":"jack0@gmail.com"})
        if user_info is None:
            return {"message":"empty_list", "response":"error"}
        return {"response":"success", "user_info":user_info}
    else:
        return {"message":"not_logged_in", "response":"error"}
    

@user_api.route("/getuserlist")
def getUserList():
    users = db.Users.find({"is_deleted":False})
    list_users = list(users)
    if len(list_users) == 0:
        return {"message":"list_empty", "response":"error"}
    json_users = dumps(list_users)
    return {"response":"success", "user_list":json_users}

@user_api.route("/postuser", methods=['POST'])
def postUser():
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
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"ts":ts,"ts_mod":ts_mod, "is_deleted":False})
    else:
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})
    return {"response":"success"}


@user_api.route("/deleteuser", methods=['POST'])
def deleteUser():
    data = request.get_json()
    userid = data.get("id")
    query = {"_id":userid}
    newvalues = { "$set": { "ts_mod": datetime.datetime.utcnow(),"is_deleted":True}}
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
    fields = data.get("fields")[0]
    update_dict = {}
    for key in fields:
        update_dict[key] = fields[key]
    update_dict["ts_mod"] = datetime.datetime.utcnow()
    result = db.Users.update_one(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "User does not exist", "response":"error"}


account_api = Blueprint('account_api', __name__)

@account_api.route("/getuserlistings", methods=['POST'])
def getUserListings():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        mylist = db.Devices.find({"user_id":userid,"is_deleted":False})
        tolist = list(mylist)
        if len(tolist) == 0:
            return {"message":"empty list","response":"error"}
        json_list = dumps(tolist)
        return {"response":"success", "user_list":json_list}
    else:
        return {"message":"not_logged_in", "response":"error"}

@account_api.route("/getuserpayments", methods=['POST'])
def getUserPayments():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        mylist = db.Payments.find({"user_id":userid,"is_deleted":False})
        tolist = list(mylist)
        if len(tolist) == 0:
            return {"message":"empty list", "response":"error"}
        json_list = dumps(tolist)
        return {"response":"success", "user_list":json_list}
    else:
        return {"message":"not_logged_in", "response":"error"}

@account_api.route("/getuserdatalinks", methods=['POST'])
def getUserDataLinks():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        mylist = db.Devices.find({"user_id":userid,"is_deleted":False},{"data_retrieval_link":1, "_id":0})
        tolist = list(mylist)
        if len(tolist) == 0:
            return {"message":"empty list","response":"error"}
        json_list = dumps(tolist)
        return {"response":"success", "user_list":json_list}
    else:
        return {"message":"not_logged_in", "response":"error"}

