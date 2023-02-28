from flask import Flask, render_template, request
from pymongo import MongoClient
import random

app = Flask(__name__)
#connect to mongo client
client = MongoClient('localhost ', 27017)
db = client.flask_db
test_db = db.test_db
#app.run(debug=True)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/apigettest')
def apigettest():
    random_results = [{'id': random.randint(1, 100), 'name': random.choice(['John', 'Jane', 'Bob', 'Alice', 'Joe'])} for i in range(5)]
    return {"results": random_results}

@app.route('/apiposttest', methods=['POST'])
def apiposttest():
    print(request.json)
    add_to_database()
    return {"results": request.json}

def add_to_database():
    test_db.insert_one({'id': random.randint(1, 100), 'name': random.choice(['John', 'Jane', 'Bob', 'Alice', 'Joe'])})
