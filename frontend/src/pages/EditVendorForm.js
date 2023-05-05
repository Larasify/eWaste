import React from 'react';

import {FaCcStripe} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';





export default function EditVendorForm(){
    let navigate = useNavigate();

    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };


    const [vendor, setVendor] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVendor({ ...vendor, [name]: value });
  };

  console.log(vendor);

    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl bg-[#E3F0EB]"}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-[#509E82]"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-2/3 m-auto rounded-2xl border-[#3fb78c] border-2"}/>
            </div>



            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:px-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-6 md:mb-4 "}>

                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Brand</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"brandInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Model Name</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"modelInput"}></input>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Sale Price</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"priceInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Size</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"sizeInput"}></input>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Memory Storage</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"storageInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>


                </div>


                <label className={"flex text-lg text-[#509E82] underline justify-center md:justify-end mr-5 mt-2 md:mt-0"}>Draft has saved!</label>
                <div className={"flex justify-end"}>
                    <button className={"w-full md:w-1/5 h-full mt-2 p-2 px-auto md:p-3 cursor-pointer bg-[#509E82] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold mb-6"}>
                    Apply
                </button></div>
            </div>
        </div>
    );
}


