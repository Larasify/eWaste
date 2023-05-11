# Backend
###
using
Flask==2.2.3
Flask_Cors==3.0.10
pymongo==4.3.3
Werkzeug==2.2.3
pytest==7.1.2
stripe==2.21.0
pandas==1.5.3


### `flask run`

Runs the app in the development mode.\
Open [http://127.0.0.1:5000](http://127.0.0.1:5000) for the api endpoint

[http://localhost:8080](http://localhost:8080) to connect with nginx configuration

### `pytest testing.py`

Runs the dedicated created unit and integration tests for all api endpoints

Comment out line 56-57 at the end app.py if you want to run on development mode with live data as these two will rebuild the database into the boilerplate config
buildvendordatasource()
rebuilddb()