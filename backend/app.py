from flask import Flask, send_from_directory, request
from flask_cors import CORS
from pymongo import MongoClient
myclient = MongoClient("mongodb://localhost:27017/")
db = myclient["ewaste_db"]
from user import user_api, account_api
from device import device_api
from payment import payment_api
from auth import auth_api
from datasources import datasources_api
from datalinks import datalinks_api

app = Flask(__name__)
app.register_blueprint(user_api, url_prefix='/user')
app.register_blueprint(account_api, url_prefix='/account')
app.register_blueprint(device_api, url_prefix='/device')
app.register_blueprint(payment_api, url_prefix='/payment')
app.register_blueprint(auth_api, url_prefix='/auth')
app.register_blueprint(datasources_api, url_prefix='/datasources')
app.register_blueprint(datalinks_api, url_prefix='/datalinks')

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/apigettest')
def apigettest():
    import random
    random_results = [{'id': random.randint(1, 100), 'name': random.choice(['John', 'Jane', 'Bob', 'Alice', 'Joe'])} for i in range(5)]
    return {"results": random_results}

@app.route('/apiposttest', methods=['POST'])
def apiposttest():
    print(request.json)
    return {"results": request.json}

