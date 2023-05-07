import './UserAccount.css';
import {useNavigate} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";

export default function UserAccount(){
    const navigate = useNavigate();
    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    const userInfo = {
        userId: "",
        firstName: "",
        firstNameChanged: false,
        lastName: "",
        lastNameChanged: false,
        emailAddr: "",
        emailAddrChanged: false,
        password: "",
        passwordChanged: false,
        phoneNo: "",
        phoneNoChanged: false
    }

    const handleFormChange = (e) => {
        userInfo[e.target.name] = e.target.value
        userInfo[e.target.name + 'Changed'] = true;
    }

    const loadUserInfo = () => {
        const myRequest = new Request("/user/getuser", {
            headers: new Headers({"Content-Type": "application/json"}),
            method: "GET",
            credentials: "include"
        })
        fetch(myRequest).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert(`Load user info (HTTP) failed: ${response.status}: ${response.statusText}`);
            }
        }).then((data) => {
            if (data['response'] === "success") {
                userInfo.firstName = data['user_info']['first_name'];
                userInfo.lastName = data['user_info']['last_name']
                userInfo.phoneNo = data['user_info']['phone_no'];
                userInfo.emailAddr = data['user_info']['email'];
                userInfo.userId = data['user_info']['_id']
                document.getElementById("firstNameInput").value = userInfo.firstName;
                document.getElementById("lastNameInput").value = userInfo.lastName;
                document.getElementById("phoneNoInput").value = userInfo.phoneNo;
                document.getElementById("emailInput").value = userInfo.emailAddr;
                document.getElementById("infoBoardName").innerHTML = `${userInfo.firstName} ${userInfo.lastName}`;
                document.getElementById("infoBoardEmailAddr").innerHTML = userInfo.emailAddr
            } else {
                alert(`Load user info failed: ${data['message']}`);
            }
        })
    }

    const submitForm = () => {
        if (document.getElementById("passwordInput").value !== document.getElementById("confirmPasswordInput").value) {
            alert("Your confirm password does not match the password above it.");
            return;
        }
        const reqBody = {
            "id": userInfo.userId,
            fields: {}
        };
        if (userInfo.firstNameChanged) {
            reqBody.fields['first_name'] = userInfo.firstName;
        }
        if (userInfo.lastNameChanged) {
            reqBody.fields['last_name'] = userInfo.lastName;
        }
        if (userInfo.phoneNoChanged) {
            reqBody.fields['phone_no'] = userInfo.phoneNo;
        }
        if (userInfo.passwordChanged) {
            reqBody.fields['password'] = userInfo.password;
        }
        if (userInfo.emailAddrChanged) {
            reqBody.fields['email'] = userInfo.emailAddr;
        }
        if (reqBody.fields === {}) {
            navigate(-1);
            return
        }
        reqBody.fields = [reqBody.fields];
        const myRequest = new Request("/user/updateuser", {
            headers: new Headers({"Content-type": 'application/json'}),
            method: "POST",
            body: JSON.stringify(reqBody)
        });
        fetch(myRequest).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert(`Update (HTTP) failed: ${response.status}: ${response.statusText}.`);
            }
        }).then((data) => {
            if (data['response'] === "success") {
                alert("Your information has been updated successfully. ")
                navigate(-1);
            } else {
                alert(`Update failed: ${data['message']}.`);
            }
        });
    };

    return (
        <div onLoad={loadUserInfo}
             className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 bg-[#ECF4F1] rounded-3xl"}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-black"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 m-auto md:mx-auto md:my-2 rounded-2xl border-[#3fb78c] border-2"}/>

                <div className={"p-4 w-max mx-auto"}>
                    <p className={"md:m-4 mx-auto text-center md:text-left leading-loose"}>
                    <span id={"infoBoardName"}
                        className={"text-base md:text-2xl lg:text-4xl text-black text-left font-bold lg:leading-10"}>Guy Brown</span>
                        <br/>
                        <span id={"infoBoardEmailAddr"}
                            className={"text-base md:text-xl lg:text-2xl text-[#509E82] underline text-left lg:leading-loose"}>just4fun@fbi.gov</span>
                    </p>
                </div>
            </div>
            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-4 mt-6"}>
                    <div>
                        <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            First Name</label>
                        <input type="text" id={"firstNameInput"} name={'firstName'} onChange={handleFormChange}
                               className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label className={" text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Last Name</label>
                        <input type="text" id={"lastNameInput"} name={"lastName"} onChange={handleFormChange}
                               className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                    </div>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                        Password</label>
                    <input type="password" id={"passwordInput"} name={"password"} onChange={handleFormChange}
                           className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                        Confirm Password</label>
                    <input type="password" id={"confirmPasswordInput"}
                           className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                        Email</label>
                    <input type="text" id={"emailInput"} name={"emailAddr"} onChange={handleFormChange}
                           className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>* Phone
                        Number</label>
                    <input type="text" id={"phoneNoInput"} name={'phoneNo'} onChange={handleFormChange}
                           className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                </div>
                <button onClick={submitForm}
                        className={"flex w-3/5 lg:w-2/5 h-full mt-6 p-2 md:p-3 mx-auto cursor-pointer bg-[#509E82] text-white  rounded-xl items-center justify-center text-2xl font-bold mb-6"}>
                    Save
                </button>
            </div>
        </div>
    );
}


