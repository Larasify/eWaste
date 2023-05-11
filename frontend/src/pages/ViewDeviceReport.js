import React from 'react';

import {FaCcStripe} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useEffect, useState} from "react";
import {Notify} from "../fragments/Notify";
import QRCode from "react-qr-code";



export default function ViewDeviceReport(){
    let navigate = useNavigate();

    const location = useLocation();
    const {deviceId} = location.state;
    const [vendors, setVendors] = useState([])
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [storages, setStorages] = useState([]);
    const [prices, setPrices] = useState([]);
    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    const [device, setDevice] = React.useState({});


  useEffect(() => {
      const myRequest = new Request("/device/getdevice", {
                headers: new Headers({"Content-Type": "application/json"}),
                method: "POST",
                credentials: "include",
                body:JSON.stringify({
                    id:deviceId,
                })
            })
      fetch(myRequest)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log('error here')
                    Notify.error(`Show report (HTTP) failed: ${response.status}: ${response.statusText}`);
                    throw `Show report (HTTP) failed: ${response.status}: ${response.statusText}`
                }
            }).then((data) => {
                console.log(data)
                if (data['response'] !== "success") {
                    Notify.error(`Show report failed: ${data['message']}`);
                } else {
                    setDevice(data['device_info'])
                    console.log(device)
                }
        });



      const loadVendors = async () => {
            const myRequest = new Request("/vendor/getvendorlist", {
                headers: new Headers({"Content-Type": "application/json"}),
                method: "GET",
                credentials: "include"
            })
            const data = await (await fetch(myRequest)).json();
            if (data['response'] !== "success") {
                throw data['message'];
            }
            setVendors(data['vendor_list']);
            setBrands([...new Set(data['vendor_list'].map((vendor) => vendor.brand))])
        }
        loadVendors().catch(e => Notify.error(e))
    }, [])


      const generateQR = () => {
      console.log(device.qr_code)
           if(device.qr_code===""||!device.hasOwnProperty("qr_code")){
               return <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] "}>{device.qr_code}</label>}
           else{
               return <QRCode value={device.qr_code} size={40}/>
           }
    }

    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl "}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl bg-[#E3F0EB]"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-[#509E82]"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 m-auto rounded-2xl border-[#3fb78c] border-2"}/>

                <div className={"flex p-4 md:pl-8  justify-center "}>
                    <p className={"md:m-4 mx-auto text-center md:text-left leading-loose"}>
                    <span
                        className={"text-base md:text-2xl lg:text-3xl text-black text-left font-bold lg:leading-10"}>{device.model}</span>
                        <br/>
                        <span
                            className={"text-base md:text-lg lg:text-xl text-[#494949] text-left "}>{device.brand}</span>
                        <br className={"md:hidden"}/>
                        <span
                            className={"md:text-lg lg:text-xl text-white font-bold rounded-full text-left bg-[#509E82] p-3 lg:ml-40"}>{device.identification}</span>
                        <br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Brand: {device.model}</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Model: {device.brand}</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Color: {device.color}</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Type: {device.type}</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left"}>Memory Storage: {device.memory_storage}GB</span><br/>
                        <span className={"md:w-full break-normal flex justify-center text-md md:font-medium text-gray-400 text-left lg:leading-loose "}>{device.description}</span>
                         </p>
                </div>
            </div>
            <div className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"flex flex-col space-y-5 mt-6 md:mb-4 w-2/3 h-full"}>
                    <div className={"lg:grid lg:grid-cols-3"}>
                        <label className={"text-left font-bold  mb-2 text-2xl text-gray-900 "}>Payment:</label>
                        <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] "}>{device.hasOwnProperty('payment2_id')?(device.payment_amount+device.payment2_amount):device.payment_amount}</label>
                    </div>
                    <div className={"lg:grid lg:grid-cols-3"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 "}>Status:</label>
                       <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] "}>{device.status}</label>
                    </div>
                    <div className= {"lg:grid lg:grid-cols-3"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 "}>Service:</label>
                       <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] "}>{device.service}</label>
                    </div>
                    <div className= {"lg:grid lg:grid-cols-2"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 "}>QR Code Link:</label>
                        {generateQR()}
                    </div>
                    <div className= {"lg:grid lg:grid-cols-2"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 "}>Service Link:</label>
                         <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] "}>{device.datalink}</label>
                    </div>
                {/*    <div className={"flex flex-col md:flex-row justify-end"}>*/}
                {/*    <button className={"w-full md:w-2/5 h-full mt-12 p-2 px-auto md:p-3 md:mr-10 cursor-pointer bg-[#509E82] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold md:mb-6"}>*/}
                {/*    Send Link*/}
                {/*    </button>*/}

                {/*</div>*/}

                </div>


            </div>
        </div>
    );
}


