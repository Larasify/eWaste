from flask import Blueprint, request
from app import db
from bson.objectid import ObjectId
from bson.json_util import dumps
import datetime
import uuid

transaction_api = Blueprint('transaction_api', __name__)

#url_prefix = /transaction

# Get a list of transactions
@transaction_api.route("/gettransactionlist")
def getTransactionList():
    transactions = db.Devices.find({"payment_id": {"$ne": None}})
    list_transactions = list(transactions)
    if len(list_transactions) == 0:
        return {"message":"empty list", "response":"error"}
    json_list = dumps(list_transactions)
    return {"response":"success", "transaction_list":json_list}
