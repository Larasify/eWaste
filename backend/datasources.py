from flask import Blueprint, request
from app import db
from bson.json_util import dumps
import datetime
import uuid

datasources_api = Blueprint('datasources_api', __name__)
#path = /datasources
#getvendors
@datasources_api.route("/getvendors")
def getVendors():
    return "list of vendors"

#getvendor
@datasources_api.route("/getvendor")
def getVendor():
    data = request.get_json()
    vendor_id = data.get("id")
    vendor = db.Vendors.find_one({"_id":vendor_id})
    if vendor is None:
        return {"message":"vendor_not_found"}
    return dumps(vendor)

#getall
@datasources_api.route("/getall")
def getAll():
    vendors = db.Vendors.find()
    if len(vendors) == 0:
        return {"message":"empty list"}
    list_vendors = list(vendors)
    json_vendors = dumps(list_vendors)
    return json_vendors

#postvendor
@datasources_api.route("/postvendor", methods=['POST'])
def postVendor():
    return "posted vendor"

#deletevendor
@datasources_api.route("/deletevendor", methods=['POST'])
def deleteVendor():
    return "deleted vendor"

#updatevendor
@datasources_api.route("/updatevendor", methods=['POST'])
def updateVendor():
    return "updated vendor"
