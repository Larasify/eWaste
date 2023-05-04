from flask import Blueprint, request
from app import db, session_ids
from bson.objectid import ObjectId
from bson.json_util import dumps
import datetime
import uuid

transaction_api = Blueprint('transaction_api', __name__)

#url_prefix = /transaction

# Get a list of transactions
@transaction_api.route("/gettransactionlist")
def getTransactionList():
    transactions = db.Devices.find({"payment_id": {"$ne": None},"is_deleted":False})
    list_transactions = list(transactions)
    if len(list_transactions) == 0:
        return {"message":"empty list", "response":"error"}
    json_list = dumps(list_transactions)
    return {"response":"success", "transaction_list":json_list}


@transaction_api.route("/getuserpayments", methods=['POST'])
def getUserPayments():
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        userid = session_ids[request.cookies.get('session-id')]
        query = {"user_id":userid,"is_deleted":False,"payment_id": {"$ne": None}}
        mylist = db.Devices.find(query)
        tolist = list(mylist)
        if len(tolist) == 0:
            return {"message":"empty list", "response":"error"}
        json_list = dumps(tolist)
        return {"response":"success", "payment_list":json_list}
    else:
        return {"message":"not_logged_in", "response":"error"}


@transaction_api.route("/getuserpaymentsbyid", methods=['POST'])
def getUserPaymentsById():
    data = request.get_json()
    userid = data.get("userid")
    query = {"user_id":userid,"is_deleted":False,"payment_id": {"$ne": None}}
    mylist = db.Devices.find(query)
    tolist = list(mylist)
    if len(tolist) == 0:
        return {"message":"empty list", "response":"error"}
    json_list = dumps(tolist)
    return {"response":"success", "payment_list":json_list}
