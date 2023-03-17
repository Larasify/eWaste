from flask import Blueprint, request
from app import db
from bson.objectid import ObjectId
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid

user_api = Blueprint('user_api', __name__)
#url_prefix = /user
@user_api.route("/getuser")
def getUser():
    data = request.get_json()
    userid = data.get("id")
    user = db.Users.find_one({"_id":userid})
    if user is None:
        return {"message":"user_not_found"}
    return dumps(user)

@user_api.route("/getuserlist")
def getUserList():
    users = db.Users.find()
    if len(users) == 0:
        return {"message":"empty list"}
    list_users = list(users)
    json_users = dumps(list_users)
    return json_users

@user_api.route("/postuser", methods=['POST'])
def postUser():
    userid = str(uuid.uuid4())
    data = request.get_json()
    email = data.get("email")
    password = generate_password_hash(data.get("password"))
    first_name = data.get("first_name")
    ts = datetime.utcnow()
    ts_mod = datetime.utcnow()
    if "last_name" in data:
        last_name = data.get("last_name")
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"ts":ts,"ts_mod":ts_mod})
        return {"message":"success"}
    db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"ts":ts,"ts_mod":ts_mod})
    return {"message":"success"}

@user_api.route("/deleteuser", methods=['POST'])
def deleteUser():
    data = request.get_json()
    userid = data.get("id")
    query = {"_id":userid}
    newvalues = { "$set": { "ts_mod": datetime.utcnow(),"is_deleted":True}}
    result = db.Users.update_one(query, newvalues)
    if result.matched_count == 1:
        return {"message": "user deleted successfully"}
    else:
        return {"message": "user does not exist"}

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
        return {"message": "user updated successfully"}
    else:
        return {"message": "user does not exist"}

account_api = Blueprint('account_api', __name__)

@account_api.route("/getuserlistings", methods=['POST'])
def getUserListings():
    data = request.get_json()
    userid = data.get("id")
    mylist = db.Devices.find({"user_id":userid})
    if len(mylist) == 0:
        return {"message":"empty list"}
    json_list = dumps(list(mylist))
    return json_list

@account_api.route("/getuserpayments", methods=['POST'])
def getUserPayments():
    data = request.get_json()
    userid = data.get("id")
    mylist = db.Payments.find({"user_id":userid})
    if len(mylist) == 0:
        return {"message":"empty list"}
    json_list = dumps(list(mylist))
    return json_list

@account_api.route("/getuserdatalinks", methods=['POST'])
def getUserDataLinks():
    data = request.get_json()
    userid = data.get("id")
    mylist = db.Devices.find({"user_id":userid},{"data_retrieval_link":1, "_id":0})
    if len(mylist) == 0:
        return {"message":"empty list"}
    json_list = dumps(list(mylist))
    return json_list
