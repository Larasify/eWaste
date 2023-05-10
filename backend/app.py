from flask import Flask, send_from_directory, request
from flask_cors import CORS
import uuid
from pymongo import MongoClient
myclient = MongoClient("mongodb://localhost:27017/")
db = myclient["ewaste_db"]
session_ids = dict()
from user import user_api, account_api
from device import device_api
#from payment import payment_api
from auth import auth_api
from vendors import vendors_api
from datalinks import datalinks_api
from transaction import transaction_api
from dbscript import rebuilddb, buildvendordatasource

app = Flask(__name__)
app.register_blueprint(user_api, url_prefix='/user')
app.register_blueprint(account_api, url_prefix='/account')
app.register_blueprint(device_api, url_prefix='/device')
app.register_blueprint(transaction_api, url_prefix='/transaction')
app.register_blueprint(auth_api, url_prefix='/auth')
app.register_blueprint(vendors_api, url_prefix='/vendor')
app.register_blueprint(datalinks_api, url_prefix='/datalinks')

CORS(app, resources={r"/*": {"origins": "*"}})



@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/apigettest')
def apigettest():
    print(request.json)
    if('session-id' in request.cookies and request.cookies.get('session-id') in session_ids):
        print(request.cookies.get('session-id'))
        return {"response":"success"}
    else:
        generated_session_id = str(uuid.uuid4())
        response = app.make_response({"response":"success", "message":"cookie generated"})
        response.set_cookie('session-id', generated_session_id)
        ##session_ids[generated_session_id] = str(uuid.uuid4())
        ##print(session_ids)
        return response


@app.route('/apiposttest', methods=['POST'])
def apiposttest():
    print(request.json)
    return {"results": request.json}

buildvendordatasource()
rebuilddb()
