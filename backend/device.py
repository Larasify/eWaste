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
    if device.get("is_deleted"):
        return {"message":"record deleted", "response":"error"}
    return {"response":"success", "device_info":dumps(device)}

# Get a list of devices
@device_api.route("/getdevicelist")
def getDeviceList():
    devices = db.Devices.find({"is_deleted":False})
    list_devices = list(devices)
    if len(list_devices) == 0:
        return {"message":"empty list", "response":"error"}
    json_devices = dumps(list_devices)
    return {"response":"success", "device_list":json_devices}

# Post a device
@device_api.route("/postdevice", methods=['POST'])
def postDevice():
    device_id = str(uuid.uuid4())
    data = request.get_json()
    user_id = data.get("user_id")
    if "vendor_id" in data:
        vendor_id = data.get("vendor_id")
    else:
        vendor_id = None
    brand = data.get("brand")
    model = data.get("model")
    identification = data.get("identification")
    status = data.get("status")
    operating_system = data.get("operating_system")
    memory_storage = data.get("memory_storage")
    color = data.get("color")
    dtype = data.get("type")
    description = data.get("description")
    service = data.get("service")
    datalink = data.get("datalink")
    qr_code = data.get("qr_code")
    device_ts = datetime.datetime.now()
    device_ts_mod = datetime.datetime.now()
    verified = data.get("verified")
    if "payment_id" in data:
        payment_id = data.get("payment_id")
        payment_amount = data.get("payment_amount")
        payment_ts = datetime.datetime.now()
        payment_ts_mod = datetime.datetime.now()
    else:
        payment_id = None
        payment_amount = None
        payment_ts = None
        payment_ts_mod = None

    db.Devices.insert_one({ "_id":device_id,"user_id":user_id,"vendor_id":vendor_id,
                            "brand":brand,"model":model,"identification":identification,
                            "status":status,"operating_system":operating_system,"memory_storage":memory_storage,
                            "color":color,"type":dtype,"description":description,"service":service,"datalink":datalink,
                            "qr_code":qr_code,"device_ts":device_ts,"device_ts_mod":device_ts_mod,"payment_id":payment_id,
                            "payment_amount":payment_amount,"payment_ts":payment_ts,"payment_ts_mod":payment_ts_mod,"is_deleted":False,"verified":verified})

    return {"response":"success"}

@device_api.route("/addpayment", methods=['POST'])
def addPayment():
    data = request.get_json()
    device_id = data.get("id")
    payment_id = data.get("payment_id")
    payment_amount = data.get("payment_amount")
    payment_ts = datetime.datetime.now()
    payment_ts_mod = datetime.datetime.now()
    query = {"_id":device_id}
    update_dict = {"payment_id":payment_id,"payment_amount":payment_amount,"payment_ts":payment_ts,"payment_ts_mod":payment_ts_mod}
    result = db.Devices.updateone(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message":"device does not exist", "response":"error"}

# Generate datalink for a device
@device_api.route("/generatedatalink", methods=['POST'])
def generateDatalink():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":deviceid}
    ts_mod = datetime.datetime.utcnow()
    datalink = str(uuid.uuid4())
    update = { "$set": { "device_ts_mod": ts_mod,"datalink":datalink}}
    result = db.Devices.update_one(query, update)
    if result.matched_count == 1:
        #TODO : notification
        device = db.Devices.find_one({"_id":device_id})
        user_id = device.get("user_id")
        model_name = device.get("model")
        query = {"_id":user_id}
        new_notification = "New datalink for device " + model_name + " is available."
        #TODO
        
        return {"response":"success"}
    else:
        return {"message":"device does not exist", "response":"error"}

# Generate a random QR code
@device_api.route("/generateqr", methods=['POST'])
def generateQR():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":deviceid}
    ts_mod = datetime.datetime.utcnow()
    qr = str(uuid.uuid4())
    update = { "$set": { "device_ts_mod": ts_mod,"qr_code":qr}}
    result = db.Devices.update_one(query, update)
    if result.matched_count == 1:
        #notification temporary
        device = db.Devices.find_one({"_id":device_id})
        user_id = device.get("user_id")
        model_name = device.get("model")
        query = {"_id":user_id}
        new_notification = "New QR code for device" + model_name + "is available."
        #TODO
        return {"response":"success"}
    else:
        return {"message":"device does not exist", "response":"error"}
    
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
@device_api.route("/updatedevice", methods=['POST'])
def updateDevice():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":device_id}
    fields = data.get("fields")[0]
    update_dict = {}
    for key in fields:
        update_dict[key] = fields[key]
    update_dict["device_ts_mod"] = datetime.datetime.utcnow()
    result = db.Devices.update_one(query, {"$set": update_dict})
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "Device does not exist", "response":"error"}

    
