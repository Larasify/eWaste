# import packages and modules
from flask import Blueprint, request
from app import db, session_ids
from bson.objectid import ObjectId
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid
import re

# define a blueprint for user APIs
user_api = Blueprint('user_api', __name__)

#url_prefix = /user

# get user information of the currently logged in user
@user_api.route("/getuser")
def getUser():
    # check if the user is logged in
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        # look up the user in the collection
        user_info = db.Users.find_one({"_id":userid})

        # if user not exist or has been deleted, return error
        if user_info is None:
            return {"message":"empty_list", "response":"error"}
        if user_info.get("is_deleted"):
            return {"message":"record deleted", "response":"error"}
        #remove password from user_info
        user_info.pop("password")
        # return user information 
        return {"response":"success", "user_info":user_info}
    else:
        return {"message":"not_logged_in", "response":"error"}

# get user information of a specific user
@user_api.route("/getuserbyid", methods=['POST'])
def getUserById():
    #check if the request is done by an admin or staff
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        callerid = session_ids[request.cookies.get('session-id')]
        caller_info = db.Users.find_one({"_id":callerid})
        if not (caller_info.get("privilege") == "admin" or caller_info.get("privilege") == "staff"):
            return {"message":"not_authorized", "response":"error"}
    else:
        return {"message":"not_logged_in", "response":"error"}
    # extract user id from the request
    data = request.get_json()
    userid = data.get("userid")
    # look up the user in the collection
    user_info = db.Users.find_one({"_id":userid})

    # if user not exist or has been deleted, return error
    if user_info is None:
        return {"message":"empty_list", "response":"error"}
    if user_info.get("is_deleted"):
        return {"message":"record deleted", "response":"error"}
    #remove password fields from user_info
    user_info.pop("password")
    # return user information 
    return {"response":"success", "user_info":user_info}
    
# get a list of all users in the collection
@user_api.route("/getuserlist")
def getUserList():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        callerid = session_ids[request.cookies.get('session-id')]
        caller_info = db.Users.find_one({"_id":callerid})
        if not (caller_info.get("privilege") == "admin" or caller_info.get("privilege") == "staff"):
            return {"message":"not_authorized", "response":"error"}
    else:
        return {"message":"not_logged_in", "response":"error"}
    # find all users haven't been deleted
    users = db.Users.find({"is_deleted":False})
    list_users = list(users)

    # if the list is empty, return an error, otherwise, return the list
    if len(list_users) == 0:
        return {"message":"list_empty", "response":"error"}
    json_users = list_users
    # remove password fields from the list
    for user in json_users:
        user.pop("password")
    return {"response":"success", "user_list":json_users}

# add a user to the collection
@user_api.route("/postuser", methods=['POST'])
def postUser():
    # extract data from the request
    userid = str(uuid.uuid4())
    data = request.get_json()
    email = data.get("email")
    # data validation
    if not validate_email(email):
        return {"response":"error", "message":"invalid_email"}
    # hash the raw password
    password = generate_password_hash(data.get("password"))
    first_name = data.get("first_name")
    ts = datetime.datetime.utcnow()
    ts_mod = datetime.datetime.utcnow()
    phone_no = data.get("phone_no")

    # get the priviledge, set "user" by default
    if "privilege" in data:
        privilege = data.get("privilege")
    else:
        privilege = "user"

    # check if the email has been used
    if db.Users.find_one({"email":email}) is not None:
        return {"response":"error", "message":"email_has_been_used"}
    # check the last name and insert the data
    if "last_name" in data:
        last_name = data.get("last_name")
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"phone_no":phone_no,"privilege":privilege,"ts":ts,"ts_mod":ts_mod, "is_deleted":False})
    else:
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"phone_no":phone_no,"privilege":privilege,"ts":ts,"ts_mod":ts_mod, "is_deleted":False})
    return {"response":"success"}

# Delete an user
@user_api.route("/deleteuser", methods=['POST'])
def deleteUser():
    # extract user id from request
    data = request.get_json()
    userid = data.get("id")
    query = {"_id":userid}
    newvalues = { "$set": { "ts_mod": datetime.datetime.utcnow(),"is_deleted":True}}
    # delete the user
    result = db.Users.update_one(query, newvalues)

    # if successfully deleted, return success, otherwise return an error message
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message": "user does not exist", "response":"error"}

# Update a user
@user_api.route("/updateuser", methods=['POST'])
def updateUser():
    # extract user id and fields to be updated from the request
    data = request.get_json()
    userid = data.get("id")
    query = {"_id":userid}
    fields = data.get("fields")[0]
    # create a update dictionary
    update_dict = {}
    for key in fields:
        # hash the password if it is in the fields
        if key == "password":
            update_dict[key] = generate_password_hash(fields[key])
        else:
            update_dict[key] = fields[key]
    update_dict["ts_mod"] = datetime.datetime.utcnow()
    # update the user
    result = db.Users.update_one(query, {"$set": update_dict})

    # check if the update was successful, return a response accordingly
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "User does not exist", "response":"error"}

# define a blueprint for account APIs
account_api = Blueprint('account_api', __name__)

# get a list of devices for currently logged in user
@account_api.route("/getuserlistings", methods=['POST'])
def getUserListings():
    # check if the user is logged in
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        # find all devices belong to the current user        
        mylist = db.Devices.find({"user_id":userid,"is_deleted":False})
        tolist = list(mylist)

        # if the list is empty, return an error
        if len(tolist) == 0:
            return {"message":"empty list","response":"error"}
        json_list = dumps(tolist)
        # return the list
        return {"response":"success", "user_list":json_list} #TODO:this really should be device list but it will break frontend so its not
    else:
        return {"message":"not_logged_in", "response":"error"}

# get a list of devices for a specific user
@account_api.route("/getuserlistingsbyid", methods=['POST'])
def getUserListingsById():
    # extract user id from the request
    data = request.get_json()
    userid = data.get("userid")
    # find all devices belong to the user
    mylist = db.Devices.find({"user_id":userid,"is_deleted":False})
    tolist = list(mylist)

    # if the list is empty, return an error
    if len(tolist) == 0:
        return {"message":"empty list","response":"error"}
    json_list = dumps(tolist)
    # return the list
    return {"response":"success", "user_list":json_list}


# get a list of datalinks for currently logged in user
@account_api.route("/getuserdatalinks", methods=['POST'])
def getUserDataLinks():
    # check if the user is logged in
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        # find all datalinks belong to the current user
        mylist = db.Devices.find({"user_id":userid,"is_deleted":False},{"data_retrieval_link":1, "_id":0})
        tolist = list(mylist)

        # if the list is empty, return an error, otherwise, return the list
        if len(tolist) == 0:
            return {"message":"empty list","response":"error"}
        json_list = dumps(tolist)
        return {"response":"success", "user_list":json_list}
    else:
        return {"message":"not_logged_in", "response":"error"}

# add notification locally in the backend
def addNotificationLocal(userid, title, message):
    # update the user with new notification
    result = db.Users.update_one({ "_id": userid },{ "$push": { "notifications": {"id":str(uuid.uuid4()), "title":title,"message":message,"ts":datetime.datetime.utcnow(),"ts_mod":datetime.datetime.utcnow(),"is_seen":False} } })
    # if user does not exist, return an error, otherwise, return success
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "User does not exist", "response":"error"}

# add notification to a user's notifications list
@user_api.route("/addnotification", methods=['POST'])
def addNotification():
    # extract data from the request
    data = request.get_json()
    userid = data.get("userid")
    title = data.get("title")
    message = data.get("message")
    # add the notification to the list
    result = db.Users.update_one({ "_id": userid },{ "$push": { "notifications": {"id":str(uuid.uuid4()), "title":title,"message":message,"ts":datetime.datetime.utcnow(),"ts_mod":datetime.datetime.utcnow(),"is_seen":False} } })
    # if user does not exist, return an error, otherwise, return success
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "User does not exist", "response":"error"}


@user_api.route("/getnotifications")
def getNotifications():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        # look up the user in the collection
        user_info = db.Users.find_one({"_id":userid})

        # if user not exist or has been deleted, return error
        if user_info is None:
            return {"message":"empty_list", "response":"error"}
        if user_info.get("is_deleted"):
            return {"message":"record deleted", "response":"error"}
        # return user information
        noti_list = []
        for n in user_info.get("notifications"):
            if not n.get("is_seen"):
                noti_list.append(n)
                
        return {"response":"success", "notifications":noti_list}
    else:
        return {"message":"not_logged_in", "response":"error"}

# mark a specific notification as 'seen'
@user_api.route("/notificationisseen", methods=['POST'])
def notificationIsSeen():
    # extract notification id from the request
    data = request.get_json()
    notificationid = data.get("notificationid")
    # update the 'is_seen' field of the notification
    result = db.Users.update_one({ "notifications.id": notificationid },{ "$set": { "notifications.$.is_seen": True } })
    # if notification does not exist, return an error, otherwise, return success
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "Notification does not exist", "response":"error"}

# make a user a staff member
@user_api.route("/makeuserstaff", methods=['POST'])
def makeUserStaff():
    #check if the call is from an admin if not return error
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        callerid = session_ids[request.cookies.get('session-id')]
        caller_info = db.Users.find_one({"_id":callerid})
        if not (caller_info.get("privilege") == "admin" ):
            return {"message":"not_authorized", "response":"error"}
    else:
        return {"message":"not_logged_in", "response":"error"}
    # extract user id from the request
    data = request.get_json()
    userid = data.get("userid")
    # update the user's privilege level to 'staff'
    result = db.Users.update_one({ "_id": userid },{ "$set": { "privilege": "staff" } })

    # if user does not exist, return an error, otherwise, return success
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "User does not exist", "response":"error"}
    
@user_api.route("/makeuseradmin", methods=['POST'])
def makeUserAdmin():
    #check if the call is from an admin if not return error
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        callerid = session_ids[request.cookies.get('session-id')]
        caller_info = db.Users.find_one({"_id":callerid})
        if not (caller_info.get("privilege") == "admin" ):
            return {"message":"not_authorized", "response":"error"}
    else:
        return {"message":"not_logged_in", "response":"error"}
    # extract user id from the request
    data = request.get_json()
    userid = data.get("userid")
    # update the user's privilege level to 'admin'
    result = db.Users.update_one({ "_id": userid },{ "$set": { "privilege": "admin" } })
    
    # check if the update was successful and return a response accordingly
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "User does not exist", "response":"error"}

# email validation
def validate_email(email):
    # check if email is a valid format
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))
