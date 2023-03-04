from flask import Blueprint

datalinks_api = Blueprint('datalinks_api', __name__)

#url_prefix = /datalinks

#get datalink
@datalinks_api.route("/getdatalink")
def getDatalink():
    return "specific datalink"

#get datalink list
@datalinks_api.route("/getdatalinklist")
def getDatalinkList():
    return "list of datalinks"


#post datalink
@datalinks_api.route("/postdatalink", methods=['POST'])
def postDatalink():
    return "posted datalink"

#delete datalink
@datalinks_api.route("/deletedatalink", methods=['POST'])
def deleteDatalink():
    return "deleted datalink"

#update datalink
@datalinks_api.route("/updatedatalink", methods=['POST'])
def updateDatalink():
    return "updated datalink"
