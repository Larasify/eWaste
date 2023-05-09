# APIS

### user
- GET one (/user/getuser) working
- GET all (/user/getuserlist) working
- POST one (/user/postuser) working post:{email,password,first_name,last_name(optional)}
- DELETE one (soft) (/user/deleteuser) working post:{id}
- PATCH one (/user/updateuser) working post {"id":"xx","fields":[{"password":"new","email":"new@gmail.com"}]}

### user
Get User Information
- URL: /user/getuser
- Method: GET
- Description: Retrieves information about the currently logged-in user.
- Response:
Success：{"response": "success","user_info": {id,email,first_name,last_name,ts,ts_mod,"is_deleted": false}}(if user is logged in and session cookie is valid)
Error: {"message": "not_logged_in", "response": "error"}(if session cookie is invalid or user is not logged in)

Get user information based on ID
- URL: /user/getuserbyid
- Method: POST
- Description: Obtain detailed information of the user based on their ID.
- Data Params: { "userid": "user_id" }
- Response: Details of the user with the specified ID, or error message


Get user list
- URL: /user/getuserlist
- Method: GET
- Description: Obtain a list of all undeleted users in the system.
- Response: List containing all undeleted users, or error message

Create New Document:
- URL: /user/postdocument
- Method: POST
- Description: Creates a new document.
- Request Body: {"title": "<Document Title>", "content": "<Document Content>"}
- Response:
Success: {"response": "success"}
Error: {"message": "creation_failed", "response": "error"}(if the document creation failed)

Delete Document:
- URL: /user/deletedocument
- Method: POST
- : Deletes the document with a specific ID.
- Request Body: {"document_id": "<Document ID>"}
- Response:
Success: {"response": "success"}(if the document is deleted successfully)
Error: {"message": "document_does_not_exist", "response": "error"}(if the document does not exist)

Update Document:
- URL: /user/updatedocument
- Method: POST
- Description: Updates the document with a specific ID.
- Request Body: {"document_id": "<Document ID>", "fields": {key: value, ...}}
- Response:
Success: {"response": "success"}(if the document is updated successfully)
Error: {"message": "document_does_not_exist", "response": "error"}(if the document does not exist)

Get User Device Listings:
- URL: /user/getuserlistings
- Method: POST
- Description: Retrieves a list of devices for the currently logged in user.
- Response:
Success: {"response":"success", "user_list":json_list}
Error: {"message":"not_logged_in", "response":"error"} or {"message":"empty list","response":"error"}

Get User Device Listings by User ID:
- URL: /user/getuserlistingsbyid
- Method: POST
- Description: Retrieves a list of devices for a user by their user ID.
- Request Body: {"userid": "<User ID>"}
- Response:
Success: {"response":"success", "user_list":json_list}
Error: {"message":"empty list","response":"error"}

Get User Data Links:
- URL: /user/getuserdatalinks
- Method: POST
- Description: Retrieves data retrieval links for the devices of the currently logged in user.
- Response:
Success: {"response":"success", "user_list":json_list}
Error: {"message":"not_logged_in", "response":"error"} or {"message":"empty list","response":"error"}

Add Notification:
- URL: /user/addnotification
- Method: POST
- Description: Adds a notification for a specific user.
- Request Body: {"userid": "<User ID>", "title": "<Title>", "message": "<Message>"}
- Response:
Success: {"response": "success"}
Error: {"message": "User does not exist", "response":"error"}

Mark Notification as Seen:
- URL: /user/notificationisseen
- Method: POST
- Description: Marks a specific notification as seen for a user.
- Request Body: {"notificationid": "<Notification ID>"}
- Response:
Success: {"response": "success"}
Error: {"message": "Notification does not exist", "response":"error"}

Make User a Staff:
- URL: /user/makeuserstaff
- Method: POST
- Description: Upgrades a user's privilege to staff level.
- Request Body: {"userid": "<User ID>"}
- Response:
Success: {"response": "success"}
Error: {"message": "User does not exist", "response":"error"}

Make User an Admin:
- URL: /user/makeuseradmin
- Method: POST
- Description: Upgrades a user's privilege to admin level.
- Request Body: {"userid": "<User ID>"}
- Response:
Success: {"response": "success"}
Error: {"message": "User does not exist", "response":"error"}


### device
- GET one (/device/getdevice) working post:{id}
- GET all (/device/getdevicelist) working
- POST one (/device/postdevice) working post:{"user_id":"a","vendor_id":"b","status":"c","color":"d","type":"e"}
- DELETE one (soft) (device/deletedevice) working post:{id}
- PATCH one (/device/updatedevice) working post {"id":"xx","fields":[{"status":"newstatus","color":"newcolor"}]}

### payment
- GET one
- GET all
- POST one
- DELETE one (soft)
- PATCH one

### transaction
- GET all (/transaction/gettransactionlist) working
- POST getuserpayments (/transaction/getuserpayments) working
- POST getuserpaymentsbyid (/transaction/getuserpaymentsbyid) working post:{userid}


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
- PATCH one (/vendor/updatevendor) working post {"id":"xx","fields":[{"brand":"newbrand","size":"new"}]}
