from flask import Flask, send_from_directory, request

app = Flask(__name__)

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