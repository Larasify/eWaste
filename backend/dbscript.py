# import packages and modules
from app import db
from bson.objectid import ObjectId
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid
import pandas
import random

# rebuild the database
def rebuilddb():
    # delete old collections
    db.Devices.drop()
    db.Users.drop()

    #insert random 50 users with random uuid email password firstname lastname ts ts_mod
    db.Users.insert_one({"_id":"0","email":"admin@admin.com","password":generate_password_hash("password"),"first_name":"admin","last_name":"admin","privilege":"admin","phone_no":"+44123123123","ts":datetime.datetime.utcnow(),"ts_mod":datetime.datetime.utcnow(),"is_deleted":False})
    db.Users.insert_one({"_id":"1","email":"staff@staff.com","password":generate_password_hash("password"),"first_name":"staff","last_name":"staff","privilege":"staff","phone_no":"+44123123123","ts":datetime.datetime.utcnow(),"ts_mod":datetime.datetime.utcnow(),"is_deleted":False})
    user_id_list = []
    for i in range(50):
        userid = str(uuid.uuid4())
        user_id_list.append(userid)
        email = "jack"+str(i)+"@gmail.com"
        password = generate_password_hash("password")
        first_name = "jack"
        last_name = "smith"
        phone_no = "+449013169"
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        privilege = "user"
        db.Users.insert_one({"_id":userid,"email":email, "password":password, "first_name":first_name,"last_name":last_name,"phone_no":phone_no,"privilege":privilege, "ts":ts,"ts_mod":ts_mod, "is_deleted":False})

    #insert random 50 device with random uuid email password firstname lastname ts ts_mod
    vendors = list(db.Vendors.aggregate([{ "$sample": { "size": 50 } }]))
    for i in range(50):
        vendor = vendors[i]
        #get 50 random vendors from the vendor db        
        device_id = str(uuid.uuid4())
        user_id = str(user_id_list[i%50])
        vendor_id = vendor["_id"]
        brand = vendor["brand"]
        model = vendor["model_name"]
        identification = "rare"
        status = "shipped"
        operating_system = "android"
        memory_storage = vendor["storage"]
        color = "red"
        type = "phone"
        description = "this is a phone"
        service = "wipe"
        datalink = "www.google.com"
        qr_code = "zQQfds123d"
        device_ts = datetime.datetime.utcnow()
        device_ts_mod = datetime.datetime.utcnow()
        payment_id = None
        payment_amount = None
        payment_ts = None
        payment_ts_mod = None
        verified = True
        db.Devices.insert_one({ "_id":device_id,"user_id":user_id,"vendor_id":vendor_id,
                              "brand":brand,"model":model,"identification":identification,
                              "status":status,"operating_system":operating_system,"memory_storage":memory_storage,
                              "color":color,"type":type,"description":description,"service":service,"datalink":datalink,
                              "qr_code":qr_code,"device_ts":device_ts,"device_ts_mod":device_ts_mod,"payment_id":payment_id,
                              "payment_amount":payment_amount,"payment_ts":payment_ts,"payment_ts_mod":payment_ts_mod,"is_deleted":False ,"verified":verified, "is_hidden":False})

# insert mobile phone data from datasources
def buildvendordatasource():
    db.Vendors.drop()
    # load csv files
    dataset1 = pandas.read_csv("vendordatasource/data_2023.csv")
    # loop through the dataset and insert the corresponding data into the database
    for i in range(len(dataset1)):
        vendor_id = str(uuid.uuid4())
        brand = dataset1['Brand'].iloc[i]
        model_name = dataset1['Model'].iloc[i]
        size = dataset1['Screen Size (inches)'].iloc[i]
        storage = dataset1['Storage '].iloc[i]
        storage = storage.replace("GB","")
        if int(storage) > 1000 or int(storage) < 16:
            continue
        storage = int(storage)
        sale_price = dataset1['Price ($)'].iloc[i]
        #replace $ with empty space in sale price and parse to float and make commas into empty space
        sale_price = float(sale_price.replace("$","").replace(",",""))
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        vendor = db.Vendors.find_one({"brand":brand, "model_name":model_name, "storage":storage})
        if vendor is None:
            db.Vendors.insert_one({"_id":vendor_id,"brand":brand,"model_name":model_name,"size":size,"storage":storage,"sale_price":sale_price,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})
        else:
            continue

    # load csv files
    dataset2 = pandas.read_csv("vendordatasource/data_india_gadgets360.csv")
    # loop through the dataset and insert the corresponding data into the database
    for i in range(len(dataset2)):
        vendor_id = str(uuid.uuid4())
        brand = dataset2['Brand'].iloc[i]
        model_name = dataset2['Model'].iloc[i]
        #take out brand from model name
        model_name = model_name.replace(brand,"")
        size = dataset2['Screen size (inches)'].iloc[i]
        storage = dataset2['Internal storage (GB)'].iloc[i]
        #if storage is above 1000 continue
        if int(storage) > 1000 or int(storage) < 16:
            continue
        storage = int(storage)
        sale_price = dataset2['Price'].iloc[i]
        sale_price = float(sale_price)*0.012
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        vendor = db.Vendors.find_one({"brand":brand, "model_name":model_name, "storage":storage})
        if vendor is None:
            db.Vendors.insert_one({"_id":vendor_id,"brand":brand,"model_name":model_name,"size":size,"storage":storage,"sale_price":sale_price,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})
        else:
            db.Vendors.update_one({"_id":vendor["_id"]},{"$set":{"sale_price2":sale_price,"ts_mod":ts_mod}})

    # add sale_price2 to all vendors in the collection that do not have a "sale_price2"
    vendors = db.Vendors.find({"sale_price2":{"$exists":False}})
    for vendor in vendors:
        random_percentage = random.randint(1,11)
        price = int(vendor["sale_price"] + (vendor["sale_price"] * random_percentage / 100))
        db.Vendors.update_one({"_id":vendor["_id"]},{"$set":{"sale_price2":price,"ts_mod":vendor["ts_mod"]}})

    # insert new documents into the database with double the storage and increased sale_prices
    vendors = db.Vendors.find({"storage":{"$exists":True}})
    for vendor in vendors:
        vendor_id = str(uuid.uuid4())
        brand = vendor["brand"]
        model_name = vendor["model_name"]
        size = vendor["size"]
        storage = vendor["storage"]*2
        sale_price = vendor["sale_price"] + random.randint(60,80)
        sale_price2 = vendor["sale_price2"] + random.randint(60,80)
        ts = datetime.datetime.utcnow()
        ts_mod = datetime.datetime.utcnow()
        vendor = db.Vendors.find_one({"brand":brand, "model_name":model_name, "storage":storage})
        if vendor is not None:
            continue
        else:
            db.Vendors.insert_one({"_id":vendor_id,"brand":brand,"model_name":model_name,"size":size,"storage":storage,"sale_price":sale_price,"sale_price2":sale_price2,"ts":ts,"ts_mod":ts_mod,"is_deleted":False})
