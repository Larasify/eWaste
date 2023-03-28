from flask import Blueprint, request
from app import db
from bson.objectid import ObjectId
from bson.json_util import dumps
import datetime
import uuid

device_api = Blueprint('device_api', __name__)

#url_prefix = /device

# Get a specific device
@device_api.route("/getdevice", methods=['POST'])
def getDevice():
    data = request.get_json()
    deviceid = data.get("id")
    device = db.Devices.find_one({"_id":deviceid})
    if device is None:
        return {"message":"device_not_found"}
    return dumps(device)

# Get a list of devices
@device_api.route("/getdevicelist")
def getDeviceList():
    devices = db.Devices.find()
    list_devices = list(devices)
    if len(list_devices) == 0:
        return {"message":"empty list", "response":"error"}
    json_devices = dumps(list_devices)
    return json_devices

# Post a device
@device_api.route("/postdevice", methods=['POST'])
def postDevice():
    device_id = str(uuid.uuid4())
    data = request.get_json()
    user_id = data.get("user_id")
    vendor_id = data.get("vendor_id")
    status = data.get("status")
    color = data.get("color")
    dtype = data.get("type")
    ts = datetime.datetime.utcnow()
    ts_mod = datetime.datetime.utcnow()
    db.Devices.insert_one({"_id":device_id,"user_id":user_id,"vendor_id":vendor_id,"status":status,"color":color,\
                           "dtype":dtype,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})
    return {"response":"success"}

# Delete a device
@device_api.route("/deletedevice", methods=['POST'])
def deleteDevice():
    data = request.get_json()
    deviceid = data.get("id")
    query = {"_id":deviceid}
    newvalues = { "$set": { "ts_mod": datetime.datetime.utcnow(),"is_deleted":True}}
    result = db.Devices.update_one(query, newvalues)
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message": "device does not exist", "response":"error"}

# Update a device
@device_api.route("/updatedevice")
def updateDevice():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":device_id}
    fields = data.get("fields")
    values = data.get("values")
    update_dict = {}
    for i in range(len(fields)):
        update_dict[fields[i]] = values[i]
    update_dict["ts_mod"] = datetime.utcnow()
    result = db.Devices.update_one(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "Device does not exist", "response":"error"}

    
