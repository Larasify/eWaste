from app import db
from bson.objectid import ObjectId
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid

def rebuilddb():
    db.Devices.drop()
    db.Users.drop()
    db.Vendors.drop()   
    #insert random 50 users with random uuid email password firstname lastname ts ts_mod
    for i in range(50):
        userid = str(uuid.uuid4())
        email = "jack"+str(i)+"@gmail.com"
        password = generate_password_hash("password")
        first_name = "jack"
        last_name = "smith"
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"ts":ts,"ts_mod":ts_mod})

    #insert random 50 vendors with random uuid email password firstname lastname ts ts_mod
    for i in range(50):
        device_id = str(uuid.uuid4())
        user_id = str(uuid.uuid4())
        cost = 100
        dtype = "type"
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        db.Devices.insert_one({"_id":device_id,"user_id":user_id,"cost":cost,"dtype":dtype,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})

    for i in range(50):
        vendor_id = str(uuid.uuid4())
        brand_list = ["Samsung", "Apple", "Huawei"]
        brand = brand_list[i%3]
        model_list = ["phone_1", "phone_2", "phone_3"]
        model_name = model_list[i%3]
        size = "5.5'"
        storage_list = ["64GB", "128GB", "256GB"]
        storage = storage_list[i%3]
        sell_price = 100 + i*10
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        db.Vendors.insert_one({"_id":vendor_id,"brand":brand,"model_name":model_name,"size":size,"storage":storage,"sell_price":sell_price,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})


