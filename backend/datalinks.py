from flask import Blueprint, request
from app import db
from bson.json_util import dumps
import datetime
import uuid

datalinks_api = Blueprint('datalinks_api', __name__)

#url_prefix = /datalinks

#get datalink
@datalinks_api.route("/getdatalink", methods=['POST'])
def getDatalink():
    data = request.get_json()
    deviceid = data.get("id")
    device = db.Devices.find_one({"_id":deviceid})
    datalink = device.get("datalink")
    if datalink is None:
        return {"message":"datalink_not_found"}
    return {"response":"success", "datalink_info":dumps(datalink)}

#get datalink list
@datalinks_api.route("/getdatalinklist")
def getDatalinkList():
    links = db.Devices.find({"datalink": {"$ne": None}})
    list_links = list(links)
    if len(list_links) == 0:
        return {"message":"empty list", "response":"error"}
    json_links = dumps(list_links)
    return {"response":"success", "link_list":json_links}


#post datalink
@datalinks_api.route("/postdatalink", methods=['POST'])
def postDatalink():
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

#delete datalink
@datalinks_api.route("/deletedatalink", methods=['POST'])
def deleteDatalink():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": device_id}
    db.Devices.update_one(query,{"$set":{"ts_mod": datetime.datetime.utcnow()}})
    result = db.Devices.update_one(query, {"$unset": {"datalink":""}})
    if result.matched_count == 1:
        return {"response": "success"}
    else:
        return {"message": "Device does not exist", "response": "error"}

#update datalink
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
