from flask import Blueprint, request
from app import db
from bson.objectid import ObjectId
from bson.json_util import dumps
import datetime
import uuid

device_api = Blueprint('device_api', __name__)

#url_prefix = /device

# Get a specific device
@device_api.route("/getdevice")
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
    if devices.count() == 0:
        return {"message":"empty list"}
    list_devices = list(devices)
    json_devices = dumps(list_devices)
    return json_devices

# Post a device
@device_api.route("/postdevice", methods=['POST'])
def postDevice():
    device_id = str(uuid.uuid4())
    data = request.get_json()
    user_id = data.get("user_id")
    cost = data.get("cost")
    dtype = data.get("type")
    ts = datetime.utcnow()
    ts_mod = datetime.utcnow()
    db.Devices.insert_one({"_id":device_id,"user_id":user_id,"cost":cost,"dtype":dtype,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})
    return {"message":"success"}

# Delete a device
@device_api.route("/deletedevice")
def deleteDevice():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":uuid.UUID(device_id)}
    newvalues = { "$set": { "ts_mod": datetime.utcnow(),"is_deleted":True}}
    result = db.Devices.update_one(query, newvalues)
    if result.matched_count == 1:
        return {"message": "Device deleted successfully"}
    else:
        return {"message": "Device does not exist"}

# Update a device
@device_api.route("/updatedevice")
def updateDevice():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": uuid.UUID(device_id)}
    fields = data.get("fields")
    values = data.get("values")
    update_dict = {}
    for i in range(len(fields)):
        update_dict[fields[i]] = values[i]
    update_dict["ts_mod"] = datetime.utcnow()
    result = db.Devices.update_one(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"message": "Device updated successfully"}
    else:
        return {"message": "Device does not exist"}

    
