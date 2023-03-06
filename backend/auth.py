from flask import Blueprint

auth_api = Blueprint('auth_api', __name__)
#url_prefix = /auth

#post login
@auth_api.route("/login", methods=['POST'])
def login():
    return "logged in"

#post register
@auth_api.route("/register", methods=['POST'])
def register():
    return "registered"

#login callback
@auth_api.route("/callback")
def callback():
    return "callback"

#logout
@auth_api.route("/logout")
def logout():
    return "logged out"