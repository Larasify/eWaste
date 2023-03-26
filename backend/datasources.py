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
    vendors = db.Vendors.find()
    if vendors.count() == 0:
        return {"message":"empty list", "response":"error"}
    list_vendors = list(vendors)
    json_vendors = dumps(list_vendors)
    return json_vendors

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
    if vendors.count() == 0:
        return {"message":"empty list", "response":"error"}
    list_vendors = list(vendors)
    json_vendors = dumps(list_vendors)
    return json_vendors

#postvendor
@datasources_api.route("/postvendor", methods=['POST'])
def postVendor():
    id = str(uuid.uuid4())
    #todo
    return {"response":"success"}

#deletevendor
@datasources_api.route("/deletevendor", methods=['POST'])
def deleteVendor():
    data = request.get_json()
    vendor_id = data.get("id")
    query = {"_id":vendor_id}
    newvalues = { "$set": { "ts_mod": datetime.utcnow(),"is_deleted":True}}
    result = db.Vendors.update_one(query, newvalues)
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message": "vendor does not exist", "response":"error"}

#updatevendor
@datasources_api.route("/updatevendor", methods=['POST'])
def updateVendor():
    data = request.get_json()
    vendor_id = data.get("id")
    query = {"_id":vendor_id}
    fields = data.get("fields")
    values = data.get("values")
    update_dict = {}
    for i in range(len(fields)):
        update_dict[fields[i]] = values[i]
    update_dict["ts_mod"] = datetime.utcnow()
    result = db.Vendors.update_one(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message": "vendor does not exist", "response":"error"}