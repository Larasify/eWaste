from flask import Blueprint

device_api = Blueprint('device_api', __name__)

#url_prefix = /device

# Get a specific device
@device_api.route("/getdevice")
def getDevice():
    return "specific device"

# Get a list of devices
@device_api.route("/getdevicelist")
def getDeviceList():
    return "list of devices"

# Post a device
@device_api.route("/postdevice", methods=['POST'])
def postDevice():
    return "posted device"

# Delete a device
@device_api.route("/deletedevice")
def deleteDevice():
    return "deleted device"

# Update a device
@device_api.route("/updatedevice")
def updateDevice():
    return "updated device"
