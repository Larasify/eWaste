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
    db.Users.insert_one({"_id":0,"email":"admin@admin.com","password":"password","first_name":"admin","last_name":"admin","priviledge":"admin","ts":datetime.datetime.utcnow(),"ts_mod":datetime.datetime.utcnow(),"is_deleted":False})
    db.Users.insert_one({"_id":1,"email":"staff@staff.com","password":"password","first_name":"staff","last_name":"staff","priviledge":"staff","ts":datetime.datetime.utcnow(),"ts_mod":datetime.datetime.utcnow(),"is_deleted":False})
    user_id_list = []
    for i in range(50):
        userid = str(uuid.uuid4())
        user_id_list.append(userid)
        email = "jack"+str(i)+"@gmail.com"
        password = generate_password_hash("password")
        first_name = "jack"
        last_name = "smith"
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        priviledge = "user"
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"priviledge":priviledge, "ts":ts,"ts_mod":ts_mod, "is_deleted":False})

    vendor_id_list = []
    for i in range(50):
        vendor_id = str(uuid.uuid4())
        vendor_id_list.append(vendor_id)
        brand_list = ["Samsung", "Apple", "Huawei"]
        brand = brand_list[i%3]
        model_list = ["phone_1", "phone_2", "phone_3"]
        model_name = model_list[i%3]
        size = "5.5'"
        storage_list = ["64GB", "128GB", "256GB"]
        storage = storage_list[i%3]
        sale_price = 100 + i*10
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        db.Vendors.insert_one({"_id":vendor_id,"brand":brand,"model_name":model_name,"size":size,"storage":storage,"sale_price":sale_price,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})



    #insert random 50 device with random uuid email password firstname lastname ts ts_mod
    for i in range(50):
        device_id = str(uuid.uuid4())
        user_id = str(user_id_list[i%50])
        vendor_id = str(vendor_id_list[i%50])
        brand = "testbrand"
        model = "testmodel"
        identification = "rare"
        status = "shipped"
        operating_system = "android"
        memory_storage = "64GB"
        color = "red"
        type = "phone"
        description = "this is a phone"
        service = "wiping"
        datalink = "www.google.com"
        qr_code = "123123123123123"
        device_ts = datetime.datetime.utcnow()
        device_ts_mod = datetime.datetime.utcnow()
        payment_id = None
        payment_amount = None
        payment_ts = None
        payment_ts_mod = None
        verified = "True"
        db.Devices.insert_one({ "_id":device_id,"user_id":user_id,"vendor_id":vendor_id,
                              "brand":brand,"model":model,"identification":identification,
                              "status":status,"operating_system":operating_system,"memory_storage":memory_storage,
                              "color":color,"type":type,"description":description,"service":service,"datalink":datalink,
                              "qr_code":qr_code,"device_ts":device_ts,"device_ts_mod":device_ts_mod,"payment_id":payment_id,
                              "payment_amount":payment_amount,"payment_ts":payment_ts,"payment_ts_mod":payment_ts_mod,"is_deleted":False ,"verified":verified})


