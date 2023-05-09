import React, {useEffect, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../App";
import {IoChevronBackCircle} from "react-icons/io5";



export default function EditVendorForm(){
    const navigate = useNavigate();
    const location = useLocation();
    const state = useLocation().state;
    const [draftMessage, setDraftMessage] = useState("");
    const authState = React.useContext(AuthContext)
    let vendor = {}
      
    React.useEffect(() => {
        if(!authState.isLoggedIn || authState.privilege!='staff') navigate('/')
    }, [])
    // let throttlePause;
    // const throttle = (callback, delay) => {
    //     if (throttlePause) return;
    //     throttlePause = true;
    //     setTimeout(() => {
    //         callback();
    //         throttlePause = false;
    //     }, delay);
    // };
    const loadVendor = () => {
        if (location.state._op === 'edit') {
            // const vendorDrafts = JSON.parse(localStorage.getItem("vendorDraft"))
            // if (vendorDrafts && vendorDrafts[state.id]) {
            //     vendor = vendorDrafts[state.id];
            //     // console.log(vendor)
            //     setDraftMessage("Draft restored! ")
            // } else {
            vendor = {
                "id": state.id,
                "brand": state.brand,
                "model_name": state.model_name,
                "sale_price": state.sale_price,
                "size": state.size,
                "storage": state.storage
            };
            // }
            document.getElementById("brandInput").value = vendor.brand;
            document.getElementById("modelInput").value = vendor.model_name;
            document.getElementById("priceInput").value = vendor.sale_price;
            document.getElementById("sizeInput").value = vendor.size;
            document.getElementById("storageInput").value = vendor.storage;
        }
    }

    const submitForm = () => {
        const myRequest = new Request(location.state._op === 'edit' ? "/vendor/updatevendor" : "/vendor/postvendor", {
            headers: new Headers({"Content-Type": "application/json"}),
            method: "POST",
            credentials: "include",
            body: JSON.stringify(location.state._op === 'edit' ? {id: vendor.id, fields: [vendor]} : vendor)
        });
        fetch(myRequest).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert(`Update vendor (HTTP) failed: ${response.status}: ${response.statusText}`);
            }
        }).then((data) => {
            if (data['response'] !== "success") {
                alert("Update vendor failed: " + data['message']);
                return;
            }
            navigate(-1);
        })
    }

    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        vendor[name] = value
        // console.log(vendor)
        // throttle(() => {
        //     const existingVendorDrafts = JSON.parse(localStorage.getItem("vendorDraft") || "{}");
        //     console.log(vendor)
        //     existingVendorDrafts[vendor.id] = vendor
        //     // console.log(existingVendorDrafts)
        //     localStorage.setItem("vendorDraft", JSON.stringify(existingVendorDrafts))
        //     setDraftMessage("Draft has been saved! ")
        // }, 1000)
    };

    return (
        <div onLoad={loadVendor} className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl bg-[#ddeafe]"}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-[#4b72b2]"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-2/3 m-auto rounded-2xl border-[#4b72b2] border-2"}/>
            </div>

            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:px-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-6 md:mb-4 "}>
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Brand</label>
                        <input type="text" id={"brandInput"} onChange={handleChange} name={"brand"}
                               className={"block w-full p-2  text-gray-900 border border-[#4b72b2] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Model Name</label>
                        <input type="text" id={"modelInput"} onChange={handleChange} name={"model_name"}
                               className={"block w-full p-2  text-gray-900 border border-[#4b72b2] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Sale Price</label>
                        <input type="text" id={"priceInput"} onChange={handleChange} name={"sale_price"}
                               className={"block w-full p-2  text-gray-900 border border-[#4b72b2] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Size</label>
                        <input type="text" id={"sizeInput"} onChange={handleChange} name={"size"}
                               className={"block w-full p-2  text-gray-900 border border-[#4b72b2] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Memory Storage</label>
                        <input type="text" id={"storageInput"} onChange={handleChange} name={"storage"}
                               className={"block w-full p-2 text-gray-900 border border-[#4b72b2] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                    </div>
                    <br className={"block md:hidden"}/>
                </div>

                <label id={"draftMessage"}
                       className={"flex text-lg text-[#4b72b2] underline justify-center md:justify-end mr-5 mt-2 md:mt-0"}>{draftMessage}</label>
                <div className={"flex justify-end"}>
                    <button onClick={submitForm}
                            className={"w-full md:w-1/5 h-full mt-2 p-2 px-auto md:p-3 cursor-pointer bg-[#4b72b2] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold mb-6"}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}


