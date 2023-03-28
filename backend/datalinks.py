from flask import Blueprint, request
from app import db
from bson.json_util import dumps
import datetime
import uuid

datalinks_api = Blueprint('datalinks_api', __name__)

#url_prefix = /datalinks

#get datalink
@datalinks_api.route("/getdatalink")
def getDatalink():
    data = request.get_json()
    deviceid = data.get("id")
    datalink = db.Devices.find_one({"_id":deviceid},{"data_retrieval_link":1, "_id":0})
    if datalink is None:
        return {"message":"datalink_not_found"}
    return dumps(datalink)

#get datalink list
@datalinks_api.route("/getdatalinklist")
def getDatalinkList():
    links = db.Devices.find({},{"data_retrieval_link":1, "_id":0})
    list_links = list(links)
    if len(list_links) == 0:
        return {"message":"empty list"}
    json_links = dumps(list_links)
    return json_links


#post datalink
@datalinks_api.route("/postdatalink", methods=['POST'])
def postDatalink():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": device_id}
    link = data.get("link")
    newvalue = {"data_retrieval_link":link, "ts_mod": datetime.utcnow()}
    result = db.Devices.update_one(query, {"$set": newvalue})
    if result.matched_count == 1:
        return {"message": "datalink posted successfully"}
    else:
        return {"message": "Device does not exist"}

#delete datalink
@datalinks_api.route("/deletedatalink", methods=['POST'])
def deleteDatalink():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": device_id}
    db.Devices.update_one(query,{"$set":{"ts_mod": datetime.utcnow()}})
    result = db.Devices.update_one(query, {"$unset": {"data_retrieval_link":""}})
    if result.matched_count == 1:
        return {"message": "datalink deleted successfully"}
    else:
        return {"message": "Device does not exist"}

#update datalink
@datalinks_api.route("/updatedatalink", methods=['POST'])
def updateDatalink():
    data = request.get_json()
    device_id = data.get("id")
    query = {"_id": device_id}
    link = data.get("link")
    newvalue = {"data_retrieval_link":link,"ts_mod": datetime.utcnow()}
    result = db.Devices.update_one(query, {"$set": newvalue})
    if result.matched_count == 1:
        return {"message": "datalink updated successfully"}
    else:
        return {"message": "Device does not exist"}
