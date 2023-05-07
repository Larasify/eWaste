import './EditUserForm.css';
import React, {useEffect} from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import {useLocation, useNavigate} from "react-router-dom";
import { Notify } from '../fragments/Notify';

export default function EditUserForm() {
    let navigate = useNavigate();
    const location = useLocation();
    // object for saving form data temporary
    let formData = {
        "firstName": location.state.first_name,
        "firstNameChanged": false,
        "lastName": location.state.last_name,
        "lastNameChanged": false,
        "emailAddr": location.state.email,
        "emailAddrChanged": false,
        "phoneNo": location.state.phone_no,
        "phoneNoChanged": false,
        "password": "",
        "passwordChanged": false,
        "privilege": location.state.privilege,
        "privilegeChanged": false
    }

    // form changing handler to reflect all changes into the variable formData
    const handleFormChange = (e) => {
        formData[e.target.name] = e.target.value
        formData[e.target.name + 'Changed'] = true;
    }

    // inject and rerender the form by data saved in the variable formData
    const injectDataIntoForm = () => {
        document.getElementById("firstNameInput").value = formData.firstName;
        document.getElementById("lastNameInput").value = formData.lastName;
        document.getElementById("emailInput").value = formData.emailAddr;
        document.getElementById("phoneInput").value = formData.phoneNo;
        if (formData.privilege === "staff") {
            document.getElementById("staffRadio").checked = true;
        } else {
            document.getElementById("userRadio").checked = true;
        }
    }

    // ask before performing backwards before submitting
    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    const submitForm = () => {
        if(location.state._op === 'edit') {
            // request body here
            const updateUserBody = {
                "id": location.state['id'],
                fields: {},
            };

            // track any changed data
            if (formData.firstNameChanged) {
                updateUserBody.fields['first_name'] = formData.firstName
            }
            if (formData.lastNameChanged) {
                updateUserBody.fields['last_name'] = formData.lastName
            }
            if (formData.emailAddrChanged) {
                updateUserBody.fields['email'] = formData.emailAddr
            }
            if (formData.phoneNoChanged) {
                updateUserBody.fields['phone_no'] = formData.phoneNo;
            }
            if (formData.passwordChanged) {
                updateUserBody.fields['password'] = formData.password;
            }
            if (formData.privilegeChanged) {
                updateUserBody.fields['privilege'] = formData.privilege;
            }
            if (updateUserBody.fields === {}) {
                navigate(-1);
                return;
            }
            // Put changed fields into a bloody array. Idk why backend takes fields in an array.
            updateUserBody.fields = [updateUserBody.fields]
            const myRequest = new Request("/user/updateuser", {
                headers: new Headers({'Content-Type': 'application/json'}),
                method: "POST",
                body: JSON.stringify(updateUserBody),
                credentials: "include"
            });
            // Submit the request
            fetch(myRequest).then((response) => {
                // Check HTTP status
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(`Update user info (HTTP) failed: ${response.status}: ${response.statusText}`);
                }
            }).then((data) => {
                // Check update response message
                if (data['response'] === "success") {
                    navigate(-1);
                } else {
                    alert(`Update user info failed: ${data['message']}`)
                }
            });
        } else if (location.state._op === 'add') {
            if(!formData.emailAddr || !formData.firstName || !formData.lastName || 
            !formData.password ||!formData.phoneNo || !formData.privilege ) {
                Notify.error('Please fill all fields');
                return null;
            }
            console.log({
                email: formData.emailAddr,
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone_no: formData.phoneNo,
                password: formData.password,
                privilege: formData.privilege
            })
            fetch('/user/postuser', {
                headers: new Headers({'Content-Type': 'application/json'}),
                method: "POST",
                body: JSON.stringify({
                    email: formData.emailAddr,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone_no: formData.phoneNo,
                    password: formData.password,
                    privilege: formData.privilege
                }),
                credentials: "include"
            }).then(req => req.json())
            .then(res => {
                if(res.response === 'success') {
                    Notify.success('User Added!')
                    navigate(-1);
                } else {
                    console.log(res)
                    Notify.error('Insert failed: ', res.message);
                }
            })
        }
        
    };

    // pull the originals and inject them into the form for editing.
    useEffect(() => {
        if (!location.state) {
            alert("invalid location.state")
        }
        const state = location.state;
        formData.firstName = state['first_name'];
        formData.lastName = state['last_name'];
        formData.emailAddr = state['email'];
        formData.privilege = state['privilege'];
        formData.phoneNo = state['phone_no']
        injectDataIntoForm();
    }, [])
    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 bg-[#ECF4F1] rounded-3xl"}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-black"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>User Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-2/3 m-auto md:mt-8 md:mx-auto  rounded-2xl border-[#3fb78c] border-2"}/>
            </div>
            <div className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-10 mt-6 md:mb-2 "}>
                    <div>
                        <label htmlFor="firstNameInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            First Name</label>
                        <input
                            className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"firstNameInput"} name={"firstName"} onChange={handleFormChange} />
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label htmlFor="lastNameInput" className={" text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Last Name</label>
                        <input
                            className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"lastNameInput"} name={"lastName"} onChange={handleFormChange} />
                    </div>
                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-10 mt-6 md:mb-2 "}>
                    <div>
                        <label htmlFor="emailInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Email</label>
                        <input
                            className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"emailInput"} name={"emailAddr"} onChange={handleFormChange} />
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label htmlFor="phoneInput" className={" text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Phone Number</label>
                        <input
                            className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"phoneInput"} name={"phoneNo"} onChange={handleFormChange} />
                    </div>
                </div>

                <div className={"md:grid md:grid-cols-2 gap-x-10 mt-6 md:mb-6 "}>
                    <div>
                        <label htmlFor="passwordInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Password</label>
                        <input
                            className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="password" id={"passwordInput"} name={"password"} onChange={handleFormChange}></input>
                    </div>
                </div>
                <div className={"mt-4 flex flex-row space-x-10 mb-6"}>
                    <div className={"flex my-auto items-center "}>
                        <input id="staffRadio" className="h-4 w-4 md:h-6 md:w-6 border border-[#509E82] mr-4 border-2
                        focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]" onChange={handleFormChange}
                               type="radio" value={"staff"} name={"privilege"} />
                        <label htmlFor={"staffRadio"} className={"text-left block text-xl font-medium text-gray-900 dark:text-white"}>Staff</label>
                    </div>
                    <br className={"md:hidden"}/>
                    <div className={"flex my-auto items-center"}>
                        <input id="userRadio" className="h-4 w-4 md:h-6 md:w-6  border border-[#509E82] border-2 mr-4
                        focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]" onChange={handleFormChange}
                               type="radio" value={"user"} name={"privilege"} />
                        <label htmlFor={"userRadio"} className={"text-left block text-xl font-medium text-gray-900 dark:text-white"}>User</label>
                    </div>
                </div>


                <button onClick={submitForm}
                        className={"flex w-2/5 lg:w-2/5 h-full mt-6 p-2 md:p-3 mx-auto cursor-pointer bg-[#509E82] text-white  rounded-full items-center justify-center text-2xl font-bold mb-6"}>
                    Apply
                </button>
            </div>
        </div>

    );
}