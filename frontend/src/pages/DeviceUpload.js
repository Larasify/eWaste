import React from 'react';

import {FaCcStripe} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const device = {
    props:{
        brand: 'Apple',
        model: 'Apple 13 Pro',
        color:'Olive',
        system:'Ios',
        storage:'256G',
        degree:'30%',
    }
};


export default function DeviceUpload(){
    let navigate = useNavigate();

    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };


    // const [brand,setBrand] = React.useState({});
    // const handleChange = (event: SelectChangeEvent) =>{
    //     setBrand(event.target.value);
    //     setBrand(event.target.value);
    // };
    const [device, setDevice] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDevice({ ...device, [name]: value });
  };

  console.log(device);

    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl"}>
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
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-6 md:mb-4 "}>

                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Brand</label>
                        <FormControl fullWidth focused={false}>
                          <Select
                            labelId="brand-label"
                            id="brand"
                            value={device.brand}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                          >
                            <MenuItem value={"Apple"}>Apple</MenuItem>
                            <MenuItem value={"Oneplus"}>Oneplus</MenuItem>
                            <MenuItem value={"Sumsang"}>Sumsang</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Model Name</label>
                        <FormControl fullWidth focused={false}>
                          <Select
                            labelId="model-label"
                            id="model"
                            value={device.model}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                          >
                            <MenuItem value={"Apple12Pro"}>Apple12Pro</MenuItem>
                            <MenuItem value={"Apple13Pro"}>Apple13Pro</MenuItem>
                            <MenuItem value={"AppleX"}>AppleX</MenuItem>
                          </Select>
                        </FormControl>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Color</label>
                        <FormControl fullWidth focused={false}>
                          <Select
                            labelId="color-label"
                            id="color"
                            value={device.color}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                          >
                            <MenuItem value={"Yellow"}>Yellow</MenuItem>
                            <MenuItem value={"Olive"}>Olive</MenuItem>
                            <MenuItem value={"Black"}>Black</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Operating System</label>
                        <FormControl fullWidth focused={false}>
                          <Select
                            labelId="system-label"
                            id="system"
                            value={device.system}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                          >
                            <MenuItem value={"Andriod"}>Andriod</MenuItem>
                            <MenuItem value={"Ios"}>IOS</MenuItem>
                          </Select>
                        </FormControl>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Memory Storage</label>
                        <FormControl fullWidth focused={false}>
                          <Select
                            labelId="storage-label"
                            id="storage"
                            value={device.storage}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                          >
                            <MenuItem value={"256g"}>256g</MenuItem>
                            <MenuItem value={"512g"}>512g</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"} >*
                            New</label>
                        <FormControl fullWidth focused={false}>
                          <Select
                            labelId="degree-label"
                            id="degree"
                            value={device.degree}
                            onChange={handleChange}
                            className={"border border-[#509E82] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                          >
                            <MenuItem value={"30%"}>30%</MenuItem>
                            <MenuItem value={"70%"}>70%</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                </div>
                <label className={" text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"} htmlFor={"descriptionInput"}>*
                            Description (No more than 500 words)</label>

                <textarea rows={"3"} className={" block w-full p-2 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                              type="text" id={"descriptionInput"}></textarea>

                {/*check box*/}
                <div className={"inline mt-4 md:grid md:grid-cols-2"}>
                    <div className={"flex items-center gap-x-4"}>
                        <input id="wipeCheckbox" className="h-4 w-4 md:h-6 md:w-6 border border-[#509E82] border-2 focus:ring-indigo-600" type="checkbox" value={"wipe"}></input>
                        <label htmlFor={"wipeCheckbox"} className={" text-left block text-xl font-medium text-gray-900 dark:text-white"}>Data Wipe Service</label>
                    </div>
                    <br className={"md:hidden"}/>
                    <div className={"flex items-center "}>
                        <input id="retrievalCheckbox" className="h-4 w-4  md:h-6 md:w-6  border border-[#509E82] border-2 mr-4 focus:ring-indigo-600" type="checkbox" value={"retrieval"}></input>
                        <label htmlFor={"retrievalCheckbox"} className={" text-left block  text-xl font-medium text-gray-900 dark:text-white"}>Data Retrival service</label>

                    </div>
                </div>


                <label className={"flex text-lg text-[#509E82] underline  justify-center md:justify-end mr-5 mt-2 md:mt-0"}>Draft has saved!</label>
                <div className={"flex justify-end"}>
                    <button className={"w-full md:w-1/5 h-full mt-2 p-2 px-auto md:p-3 cursor-pointer bg-[#509E82] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold mb-6"}>
                    Submit
                </button></div>
            </div>
        </div>
    );
}


