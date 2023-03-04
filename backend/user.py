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


account_api = Blueprint('account_api', __name__)

@account_api.route("/getuserlistings", methods=['POST'])
def getUserListings():
    return "list of listings for a specific user"

@account_api.route("/getuserpayments", methods=['POST'])
def getUserPayments():
    return "list of payments for a specific user"

@account_api.route("/getuserdatalinks", methods=['POST'])
def getUserDataLinks():
    return "list of data links for a specific user"