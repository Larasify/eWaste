from flask import Blueprint

datasources_api = Blueprint('datasources_api', __name__)
#path = /datasources
#getvendors
@datasources_api.route("/getvendors")
def getVendors():
    return "list of vendors"

#getvendor
@datasources_api.route("/getvendor")
def getVendor():
    return "specific vendor"

#getall
@datasources_api.route("/getall")
def getAll():
    return "all data??"

#postvendor
@datasources_api.route("/postvendor", methods=['POST'])
def postVendor():
    return "posted vendor"

#deletevendor
@datasources_api.route("/deletevendor", methods=['POST'])
def deleteVendor():
    return "deleted vendor"

#updatevendor
@datasources_api.route("/updatevendor", methods=['POST'])
def updateVendor():
    return "updated vendor"
