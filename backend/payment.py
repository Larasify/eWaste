from flask import Blueprint, request, redirect, url_for, jsonify
from app import db
from bson.json_util import dumps
import datetime
import uuid
import paypalrestsdk

payment_api = Blueprint('payment_api', __name__)

# Configuring the PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret"
})

#url_prefix = /payment

# Get a specific payment
@payment_api.route("/getpayment", methods=['POST'])
def getPayment():
    data = request.get_json()
    payment_id = data.get("id")
    payment = db.Payments.find_one({"_id":payment_id})
    if payment is None:
        return {"response":"error","message":"payment_not_found"}
    if payment.get("is_deleted"):
        return {"message":"record deleted", "response":"error"}
    return {"response":"success", "payment_info":dumps(payment)}

# Get a list of payments
@payment_api.route("/getpaymentlist")
def getPaymentList():
    payments = db.Payments.find({"is_deleted":False})
    list_payments = list(payments)
    if len(list_payments) == 0:
        return {"message":"empty list", "response":"error"}
    json_payments = dumps(list_payments)
    return {"response":"success", "payment_list":json_payments}

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

# Create a PayPal payment
@payment_api.route("/create_paypal_payment", methods=["POST"])
def create_paypal_payment():
    payment_data = request.get_json()
    items = payment_data["items"]
    total_amount = sum([float(item["price"]) for item in items])

    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"},
        "redirect_urls": {
            "return_url": url_for("payment_api.execute_paypal_payment", _external=True),
            "cancel_url": url_for("payment_api.cancel_paypal_payment", _external=True)},
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": item["name"],
                    "sku": item["sku"],
                    "price": item["price"],
                    "currency": payment_data["currency"],
                    "quantity": item["quantity"]} for item in items]},
            "amount": {
                "total": str(total_amount),
                "currency": payment_data["currency"]},
            "description": payment_data["description"]}]})


    if payment.create():
        print("Payment created successfully")
        for link in payment.links:
            if link.rel == "approval_url":
                approval_url = link.href
                return jsonify({"approval_url": approval_url})
    else:
        print(payment.error)
        return jsonify({"error": payment.error})

# Execute a PayPal payment
@payment_api.route("/execute_paypal_payment", methods=["GET"])
def execute_paypal_payment():
    payment_id = request.args.get("paymentId")
    payer_id = request.args.get("PayerID")

    payment = paypalrestsdk.Payment.find(payment_id)

    if payment.execute({"payer_id": payer_id}):
        print("Payment executed successfully")
        return jsonify({"result": "success", "payment": payment.to_dict()})
    else:
        print(payment.error)
        return jsonify({"error": payment.error})

# Cancel a PayPal payment
@payment_api.route("/cancel_paypal_payment", methods=["GET"])
def cancel_paypal_payment():
    return jsonify({"result": "canceled"})
