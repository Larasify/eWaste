from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, current_user, login_user, logout_user
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
login = LoginManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import models

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return 0 #todo
    data = request.get_json()
    user = User.query.filter_by(username=data.get("username")).first()
    if user is None or not user.check_password(data.get("password")):
        return {"result": "invalid username or password"}
    login_user(user, remember=data.get("remember_me"))
    return {"results": "logged in"}

@app.route('/logout')
def logout():
    logout_user()
    return {"result": "logged out"}

@app.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return 0 #todo
    data = request.get_json()
    user = User(username=data.get("username"), email=data.get("email"))
    user.set_password(data.get("password"))
    db.session.add(user)
    db.session.commit()
    return {"result": "registered"}

@app.route('/apigettest')
def apigettest():
    import random
    random_results = [{'id': random.randint(1, 100), 'name': random.choice(['John', 'Jane', 'Bob', 'Alice', 'Joe'])} for i in range(5)]
    return {"results": random_results}

@app.route('/apiposttest', methods=['POST'])
def apiposttest():
    print(request.json)
    return {"results": request.json}
