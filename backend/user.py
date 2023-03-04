from flask import Blueprint

user_api = Blueprint('user_api', __name__)
#url_prefix = /user
@user_api.route("/getuser")
def getUser():
    return "specific user"

@user_api.route("/getuserlist")
def getUserList():
    return "list of users"

@user_api.route("/postuser", methods=['POST'])
def postUser():
    return "posted user"

@user_api.route("/deleteuser", methods=['POST'])
def deleteUser():
    return "deleted user"

@user_api.route("/updateuser", methods=['POST'])
def updateUser():
    return "updated user"
