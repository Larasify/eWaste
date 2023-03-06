from flask import Blueprint

payment_api = Blueprint('payment_api', __name__)

#url_prefix = /payment

# Get a specific payment
@payment_api.route("/getpayment")
def getPayment():
    return "specific payment"

# Get a list of payments
@payment_api.route("/getpaymentlist")
def getPaymentList():
    return "list of payments"

# Post a payment
@payment_api.route("/postpayment", methods=['POST'])
def postPayment():
    return "posted payment"

# Delete a payment
@payment_api.route("/deletepayment", methods=['POST'])
def deletePayment():
    return "deleted payment"

# Update a payment
@payment_api.route("/updatepayment", methods=['POST'])
def updatePayment():
    return "updated payment"