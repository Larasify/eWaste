# import packages and modules
from flask import Blueprint, request
from app import db
from bson.json_util import dumps
import datetime
import uuid

# define a blueprint for datalinks APIs
datalinks_api = Blueprint('datalinks_api', __name__)

#url_prefix = /datalinks

# get datalink for a specific device
@datalinks_api.route("/getdatalink", methods=['POST'])
def getDatalink():
    # extract device id from the request
    data = request.get_json()
    deviceid = data.get("id")
    # look up in the table and get the datalink
    device = db.Devices.find_one({"_id":deviceid})
    datalink = device.get("datalink")
    
    # check the result and return
    if datalink is None:
        return {"message":"datalink_not_found"}
    return {"response":"success", "datalink_info":dumps(datalink)}

# get a list of all devices with datalinks
@datalinks_api.route("/getdatalinklist")
def getDatalinkList():
    # find all devices in the database with datalink
    links = db.Devices.find({"datalink": {"$ne": None}})
    list_links = list(links)
    
    # if the list is empty, return an error
    if len(list_links) == 0:
        return {"message":"empty list", "response":"error"}
    # otherwise, return the list
    json_links = dumps(list_links)
    return {"response":"success", "link_list":json_links}


# add a datalink to a device
@datalinks_api.route("/postdatalink", methods=['POST'])
def postDatalink():
    # extract data from the request
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": device_id}
    link = data.get("link")
    newvalue = {"datalink":link, "ts_mod": datetime.datetime.utcnow()}
    # update the device
    result = db.Devices.update_one(query, {"$set": newvalue})

    # if successfully updated, return success, otherwise return an error.
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "Device does not exist", "response":"error"}

# delete a datalink from a device
@datalinks_api.route("/deletedatalink", methods=['POST'])
def deleteDatalink():
    # extract device id from the request
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": device_id}
    # update the device
    db.Devices.update_one(query,{"$set":{"ts_mod": datetime.datetime.utcnow()}})
    result = db.Devices.update_one(query, {"$unset": {"datalink":""}})

    # if successfully updated, return success, otherwise return an error.
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "Device does not exist", "response": "error"}

# update datalink of a device
@datalinks_api.route("/updatedatalink", methods=['POST'])
def updateDatalink():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": device_id}
    link = data.get("link")
    newvalue = {"datalink":link, "ts_mod": datetime.datetime.utcnow()}
    result = db.Devices.update_one(query, {"$set": newvalue})
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "Device does not exist", "response":"error"}
