from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/apigettest')
def apigettest():
    import random
    random_results = [{'id': random.randint(1, 100), 'name': random.choice(['John', 'Jane', 'Bob', 'Alice', 'Joe'])} for i in range(5)]
    return {"results": random_results}

@app.route('/apiposttest', methods=['POST'])
def apiposttest():
    print(request.json)
    return {"results": request.json}