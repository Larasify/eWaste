from flask import Blueprint, request
from app import db
from bson.json_util import dumps
import datetime
import uuid

vendors_api = Blueprint('vendors_api', __name__)
#path = /datasources
#getvendors
@vendors_api.route("/getvendors")
def getVendors():
    vendors = db.Vendors.find()
    if vendors.count() == 0:
        return {"message":"empty list", "response":"error"}
    list_vendors = list(vendors)
    json_vendors = dumps(list_vendors)
    return json_vendors

#getvendor
@vendors_api.route("/getvendor")
def getVendor():
    data = request.get_json()
    vendor_id = data.get("id")
    vendor = db.Vendors.find_one({"_id":vendor_id})
    if vendor is None:
        return {"message":"vendor_not_found"}
    return dumps(vendor)

#getall
@vendors_api.route("/getall")
def getAll():
    vendors = db.Vendors.find()
    if vendors.count() == 0:
        return {"message":"empty list", "response":"error"}
    list_vendors = list(vendors)
    json_vendors = dumps(list_vendors)
    return json_vendors

#postvendor
@vendors_api.route("/postvendor", methods=['POST'])
def postVendor():
    vendor_id = str(uuid.uuid4())
    data = request.get_json()
    brand = data.get("brand")
    model_name = data.get("model_name")
    size = data.get("size")
    storage = data.get("storage")
    sell_price = data.get("sell_price")
    ts = datetime.utcnow()
    ts_mod = datetime.utcnow()
    db.Vendors.insert_one({"_id":vendor_id,"brand":brand,"model_name":model_name,"size":size,"storage":storage,\
                           "sell_price":sell_price,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})
    return {"response":"success"}

#deletevendor
@vendors_api.route("/deletevendor", methods=['POST'])
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
@vendors_api.route("/updatevendor", methods=['POST'])
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
