# import packages and modules
from flask import Blueprint, request
from app import db, session_ids
from bson.objectid import ObjectId
from bson.json_util import dumps
import datetime
import uuid

# define a blueprint for transaction APIs
transaction_api = Blueprint('transaction_api', __name__)

#url_prefix = /transaction

# get a list of all devices with transaction
@transaction_api.route("/gettransactionlist")
def getTransactionList():
    # find all devices in the database with payment
    transactions = db.Devices.find({"payment_id": {"$ne": None},"is_deleted":False})
    list_transactions = list(transactions)

    # if the list is empty, return an error, otherwise, return the list
    if len(list_transactions) == 0:
        return {"message":"empty list", "response":"error"}
    json_list = dumps(list_transactions)
    return {"response":"success", "transaction_list":json_list}

# get a list of user payments for the currently logged-in user
@transaction_api.route("/getuserpayments", methods=['POST'])
def getUserPayments():
    # check if the user is logged in
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        query = {"user_id":userid,"is_deleted":False,"payment_id": {"$ne": None}}
        # find all payments belong to the current user
        mylist = db.Devices.find(query)
        tolist = list(mylist)

        # if the list is empty, return an error
        if len(tolist) == 0:
            return {"message":"empty list", "response":"error"}
        json_list = dumps(tolist)
        # return the list
        return {"response":"success", "payment_list":json_list}
    else:
        return {"message":"not_logged_in", "response":"error"}

# get a list of user payments for a specific user
@transaction_api.route("/getuserpaymentsbyid", methods=['POST'])
def getUserPaymentsById():
    # extract data from the request
    data = request.get_json()
    userid = data.get("userid")
    query = {"user_id":userid,"is_deleted":False,"payment_id": {"$ne": None}}
    # find all payments belong to the user
    mylist = db.Devices.find(query)
    tolist = list(mylist)

    # if the list is empty, return an error
    if len(tolist) == 0:
        return {"message":"empty list", "response":"error"}
    # return the list
    json_list = dumps(tolist)
    return {"response":"success", "payment_list":json_list}
