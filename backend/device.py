# import packages and modules
from flask import Blueprint, request
from app import db
from bson.objectid import ObjectId
from bson.json_util import dumps
import datetime
import uuid
from user import addNotificationLocal

# define a blueprint for device APIs
device_api = Blueprint('device_api', __name__)

#url_prefix = /device

# Get a specific device
@device_api.route("/getdevice", methods=['POST'])
def getDevice():
    # extract device id from the request
    data = request.get_json()
    deviceid = data.get("id")
    # look up in the table
    device = db.Devices.find_one({"_id":deviceid})

    # check the result and return
    if device is None:
        return {"message":"device_not_found"}
    if device.get("is_deleted"):
        return {"message":"record deleted", "response":"error"}
    return {"response":"success", "device_info":dumps(device)}

# Get a list of all devices
@device_api.route("/getdevicelist")
def getDeviceList():
    # find all devices in the database
    devices = db.Devices.find({"is_deleted":False})
    list_devices = list(devices)

    # if the list is empty, return an error
    if len(list_devices) == 0:
        return {"message":"empty list", "response":"error"}
    # otherwise, return the list
    json_devices = dumps(list_devices)
    return {"response":"success", "device_list":json_devices}

# Post a device
@device_api.route("/postdevice", methods=['POST'])
def postDevice():
    device_id = str(uuid.uuid4())
    # extract data from the request
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
    
    if verified is False:
        #send notification to every staff if a device is unverified
        staffs = db.Users.find({"privilege":"staff"})
        for staff in staffs:
            addNotificationLocal(staff.get("_id"),"New Unverified Device Added", "A new unverified device has been added.")
    if "payment_id" in data:
        # get payment information if it has any
        payment_id = data.get("payment_id")
        payment_amount = data.get("payment_amount")
        payment_ts = datetime.datetime.now()
        payment_ts_mod = datetime.datetime.now()
        addNotificationLocal(user_id,"Successful Payment", "Your payment for device " + model + " has been successful.")
    else:
        payment_id = None
        payment_amount = None
        payment_ts = None
        payment_ts_mod = None

    # insert a new document to the table
    db.Devices.insert_one({ "_id":device_id,"user_id":user_id,"vendor_id":vendor_id,
                            "brand":brand,"model":model,"identification":identification,
                            "status":status,"operating_system":operating_system,"memory_storage":memory_storage,
                            "color":color,"type":dtype,"description":description,"service":service,"datalink":datalink,
                            "qr_code":qr_code,"device_ts":device_ts,"device_ts_mod":device_ts_mod,"payment_id":payment_id,
                            "payment_amount":payment_amount,"payment_ts":payment_ts,"payment_ts_mod":payment_ts_mod,"is_deleted":False,"verified":verified})

    return {"response":"success"}


# add a payment to a device
@device_api.route("/addpayment", methods=['POST'])
def addPayment():
    # extract data from the request
    data = request.get_json()
    device_id = data.get("id")
    payment_id = data.get("payment_id")
    payment_amount = data.get("payment_amount")
    payment_ts = datetime.datetime.now()
    payment_ts_mod = datetime.datetime.now()
    query = {"_id":device_id}

    # check the type of the payment
    if "type" in data:
        payment2_type = data.get("type")
        update_dict = {"payment2_id":payment_id,"payment2_amount":payment_amount,"payment2_ts":payment_ts,"payment2_ts_mod":payment_ts_mod, "payment2_type":payment2_type}
    else:
        update_dict = {"payment_id":payment_id,"payment_amount":payment_amount,"payment_ts":payment_ts,"payment_ts_mod":payment_ts_mod}

    # update the device
    result = db.Devices.update_one(query, {"$set": update_dict})

    # if successfully updated, return success and send notification, otherwise return an error.
    if result.matched_count == 1:
        #find device with that device id
        device = db.Devices.find_one({"_id":device_id})
        addNotificationLocal(device.get("user_id"),"Successful Payment", "Your payment for device " + device.get("model") + " has been successful.")
        return {"response":"success"}
    else:
        return {"message":"device does not exist", "response":"error"}

# Generate datalink for a device
@device_api.route("/generatedatalink", methods=['POST'])
def generateDatalink():
    # extract data from the request
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":device_id}
    ts_mod = datetime.datetime.utcnow()
    # new datalink
    datalink = "https://www.dropbox.com/"
    update = { "$set": { "device_ts_mod": ts_mod,"datalink":datalink}}
    # update the device
    result = db.Devices.update_one(query, update)

    # if successfully updated, return success and send notification, otherwise return an error.
    if result.matched_count == 1:
        device = db.Devices.find_one({"_id":device_id})
        user_id = device.get("user_id")
        model_name = device.get("model")
        addNotificationLocal(user_id,"Download Available", "Your download for device " + model_name + " is available.")
        return {"response":"success"}
    else:
        return {"message":"device does not exist", "response":"error"}

# Generate a random QR code
@device_api.route("/generateqr", methods=['POST'])
def generateQR():
    # extract data from the request
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":device_id}
    ts_mod = datetime.datetime.utcnow()
    # generate qr code
    qr = str(uuid.uuid4())
    update = { "$set": { "device_ts_mod": ts_mod,"qr_code":qr}}
    # update the device
    result = db.Devices.update_one(query, update)

    # if successfully updated, return success and send notification, otherwise return an error.
    if result.matched_count == 1:
        #notification temporary
        device = db.Devices.find_one({"_id":device_id})
        user_id = device.get("user_id")
        model_name = device.get("model")
        addNotificationLocal(user_id,"Coupon Available", "You have a new coupon for  " + model_name + " available.")
        return {"response":"success"}
    else:
        return {"message":"device does not exist", "response":"error"}
    
# Delete a device
@device_api.route("/deletedevice", methods=['POST'])
def deleteDevice():
    # extract device id from the request
    data = request.get_json()
    deviceid = data.get("id")
    query = {"_id":deviceid}
    newvalues = { "$set": { "ts_mod": datetime.datetime.utcnow(),"is_deleted":True}}
    # delete the device
    result = db.Devices.update_one(query, newvalues)

    # if successfully deleted, return success, otherwise return an error.
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message": "device does not exist", "response":"error"}

# Update a device
@device_api.route("/updatedevice", methods=['POST'])
def updateDevice():
    # extract device id, fields that need to be updated from the request
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id":device_id}
    fields = data.get("fields")[0]
    update_dict = {}
    for key in fields:
        update_dict[key] = fields[key]
    update_dict["device_ts_mod"] = datetime.datetime.utcnow()
    # update the device
    result = db.Devices.update_one(query, {"$set": update_dict})

    # if successfully updated, return success and add notification, otherwise return an error.
    if result.matched_count == 1:
        #if update_dict has a key called status send a notification
        if "status" in update_dict:
            device = db.Devices.find_one({"_id":device_id})
            user_id = device.get("user_id")
            model_name = device.get("model")
            addNotificationLocal(user_id,"Device Status Changed", "The status of your device " + model_name + " has been changed.")
        return {"response": "success"}
    else:
        return {"message": "Device does not exist", "response":"error"}

# save image for a specific device
@device_api.route("/uploadimg", methods=['POST'])
def uploadImg():
    # extract image and device id from the request
    file = request.files['file']
    device_id = request.form.get("id")
    #save file to deviceimages folder under deviceid.jpeg
    file.save("deviceimages/" + device_id + ".jpeg")
    #save filepath to db
    query = {"_id":device_id}
    update_dict = {"image_path":"deviceimages/" + device_id + ".jpeg"}
    # update the device
    result = db.Devices.update_one(query, {"$set": update_dict})
    
    # if successfully uploaded, return success, otherwise return an error.
    if result.matched_count == 1:
        return {"response":"success"}
    else:
        return {"message":"device does not exist", "response":"error"}
    
