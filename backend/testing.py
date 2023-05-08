import pytest
from app import app, db , rebuilddb


@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client

def test_user_apis(client):
    rebuilddb()
    rv = app.test_client().get('/user/getuser')
    assert b'not_logged_in' in rv.data
    rv = app.test_client().get('/user/getuserlist')
    assert b'jack0@gmail.com' in rv.data
    rv = app.test_client().post('/user/getuserbyid', json={"userid":"0"})
    assert b'admin@admin.com' in rv.data

    rv = app.test_client().post('/user/postuser', json={"email":"test@unit.com","password":"password","first_name":"test","phone_no":"+44123123123"})
    assert b'success' in rv.data
    rv = app.test_client().post('/user/postuser', json={"email":"test@unit.com","password":"password","first_name":"test","phone_no":"+44123123123"})
    assert b'email_has_been_used' in rv.data
    rv = app.test_client().post('/user/postuser', json={"email":"admintest@unit.com","password":"password","first_name":"test","phone_no":"+44123123123", "privilege":"admin"})
    assert b'success' in rv.data
    rv = app.test_client().get('/user/getuserlist')
    assert b'test@unit.com' and b'admintest@unit.com' in rv.data

    rv = app.test_client().post('/user/deleteuser', json={"id":"0"})
    assert b'success' in rv.data
    #rv = app.test_client().post('/user/deleteuser', json={"id":"0"}) #TODO: You can delete an already deleted user
    #assert b'does not exist' in rv.data

    rv = app.test_client().post('/user/updateuser', json={"id":"1", "fields":[{"first_name":"test2"}]})
    assert b'success' in rv.data
    
    rv = app.test_client().post('/account/getuserlistings') #TODO: Do we need getuserlistingsbyid ?
    assert b'not_logged_in' in rv.data
    rv = app.test_client().post('/account/getuserdatalinks')
    assert b'not_logged_in' in rv.data

    rv = app.test_client().post('/user/addnotification', json={"userid":"1", "title":"testnotification", "message":"test"})
    assert b'success' in rv.data
    rv = app.test_client().post('/user/getuserbyid', json={"userid":"1"})
    assert b'testnotification' in rv.data

    rv = app.test_client().post('/user/makeuserstaff', json={"userid":"0"})
    assert b'success' in rv.data 
    user_info = db.Users.find_one({"_id":"0"})
    assert user_info.get("privilege") == "staff"

    rv = app.test_client().post('/user/makeuseradmin', json={"userid":"1"})
    assert b'success' in rv.data
    user_info = db.Users.find_one({"_id":"1"})
    assert user_info.get("privilege") == "admin"

