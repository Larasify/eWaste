from flask import Blueprint, request
from app import db
from bson.json_util import dumps
import datetime
import uuid

payment_api = Blueprint('payment_api', __name__)

#url_prefix = /payment

# Get a specific payment
@payment_api.route("/getpayment", methods=['POST'])
def getPayment():
    data = request.get_json()
    payment_id = data.get("id")
    payment = db.Payments.find_one({"_id":payment_id})
    if payment is None:
        return {"message":"payment_not_found"}
    return dumps(payment)

# Get a list of payments
@payment_api.route("/getpaymentlist")
def getPaymentList():
    payments = db.Payments.find()
    list_payments = list(payments)
    if len(list_payments) == 0:
        return {"message":"empty list", "response":"error"}
    json_payments = dumps(list_payments)
    return json_payments

# Post a payment
@payment_api.route("/postpayment", methods=['POST'])
def postPayment():
    payment_id = str(uuid.uuid4())
    data = request.get_json()
    user_id = data.get("user_id")
    device_id = data.get("device_id")
    invoice_id = data.get("invoice_id")
    amount = data.get("amount")
    ts = datetime.datetime.utcnow()
    ts_mod = datetime.datetime.utcnow()
    
    db.Payments.insert_one({"_id":payment_id,"user_id":user_id,"device_id":device_id,"invoice_id":invoice_id,"amount":amount,\
                            "ts":ts,"ts_mod":ts_mod,"is_deleted":False})
    
    return {"response":"success"}

# Delete a payment
@payment_api.route("/deletepayment", methods=['POST'])
def deletePayment():
    data = request.get_json()
    payment_id = data.get("id")
    query = {"_id":payment_id}
    newvalues = { "$set": { "ts_mod": datetime.datetime.utcnow(),"is_deleted":True}}
    result = db.Payments.update_one(query, newvalues)
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "payment does not exist", "response":"error"}

# Update a payment
@payment_api.route("/updatepayment", methods=['POST'])
def updatePayment():
    data = request.get_json()
    payment_id = data.get("id")
    query = {"_id": payment_id}
    fields = data.get("fields")
    values = data.get("values")
    update_dict = {}
    
    for i in range(len(fields)):
        update_dict[fields[i]] = values[i]
    update_dict["ts_mod"] = datetime.datetime.utcnow()
    
    result = db.Payments.update_one(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "payment does not exist", "response":"error"}
