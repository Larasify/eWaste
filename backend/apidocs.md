# APIS

### user
- GET one (/user/getuser) working
- GET all (/user/getuserlist) working
- POST one (/user/postuser) working post:{email,password,first_name,last_name(optional)}
- DELETE one (soft) (/user/deleteuser) working post:{id}
- PATCH one (/user/updateuser) working post {"id":"xx","fields":[],"values":[]}

### user
- Get User Information
URL: /user/getuser
Method: GET
Description: Retrieves information about the currently logged-in user.
Response:
Success：{"response": "success","user_info": {id,email,first_name,last_name,ts,ts_mod,"is_deleted": false}}(if user is logged in and session cookie is valid)
Error: {"message": "not_logged_in", "response": "error"}(if session cookie is invalid or user is not logged in)


### device
- GET one (/device/getdevice) working post:{id}
- GET all (/device/getdevicelist) working
- POST one (/device/postdevice) working post:{"user_id":"a","vendor_id":"b","status":"c","color":"d","type":"e"}
- DELETE one (soft) (device/deletedevice) working post:{id}
- PATCH one (/device/updatedevice) working post {"id":"xx","fields":[],"values":[]}

### payment
- GET one
- GET all
- POST one
- DELETE one (soft)
- PATCH one

### auth
- POST login (/auth/login) working post:{email, password}
- POST register working post:{email,password,first_name,last_name(optional)}
- POST login/callback not working
- GET logout working

### account
- GET user-listings working (returns devices?)
- GET user-payments not working
- GET user-data-links not working

### datalinks
- GET one
- GET all
- POST one
- DELETE one (soft)
- PATCH one

### vendors
- GET vendorlist (/vendor/getvendorlist) working
- GET vendor working post:{id}
- GET all working
- POST one working post:{"brand":"a","model_name":"b","size":"c","storage":"d","sale_price":"123"}
- DELETE one (soft) working
- PATCH one (/vendor/updatevendor) working post {"id":"xx","fields":[],"values":[]}
