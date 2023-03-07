from flask import Flask, send_from_directory, request
from flask_cors import CORS
from user import user_api, account_api
from device import device_api
from payment import payment_api
from auth import auth_api
from datasources import datasources_api
from datalinks import datalinks_api
import uuid


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
    print(request.json)
    if('session-id' in request.cookies):
        print(request.cookies.get('session-id'))
        return {"results": request.json}
    else:
        generated_session_id = generate_random_session_id()
        response = app.make_response({"results": request.json})
        response.set_cookie('session-id', generated_session_id)
        return response


@app.route('/apiposttest', methods=['POST'])
def apiposttest():
    print(request.json)
    if('session-id' in request.cookies):
        print(request.cookies.get('session-id'))
        return {"results": request.json}
    else:
        generated_session_id = generate_random_session_id()
        response = app.make_response({"results": request.json})
        response.set_cookie('session-id', generated_session_id)
        return response

def generate_random_session_id():
    return str(uuid.uuid4())

