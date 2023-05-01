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
        worth:'382',
    }
};


export default function EditDeviceForm(){
    let navigate = useNavigate();

    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };


    const [device, setDevice] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDevice({ ...device, [name]: value });
  };

  console.log(device);

    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl bg-[#E3F0EB]"}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-[#509E82]"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 m-auto rounded-2xl border-[#3fb78c] border-2"}/>

                <div className={"flex p-4 md:pl-8  justify-center"}>
                    <p className={"md:m-4 mx-auto text-center md:text-left leading-loose"}>
                    <span
                        className={"text-base md:text-2xl lg:text-3xl text-black text-left font-bold lg:leading-10"}>iPhone 13</span>
                        <br/>
                        <span
                            className={"text-base md:text-lg lg:text-xl text-[#494949] text-left "}>Apple</span>
                        <br className={"md:hidden"}/>
                        <span
                            className={"md:text-lg lg:text-xl text-white font-bold rounded-full text-left bg-[#509E82] p-3 lg:ml-40"}>Current</span>
                        <br/>
                        <span
                            className={"text-base md:text-xl lg:text-2xl md:font-medium text-black text-left lg:leading-loose "}>Expected Value:</span>
                        <br/>
                        <span
                            className={"text-base md:text-xl lg:text-3xl md:font-medium text-[#509E82] text-left lg:leading-loose "}>{"£"+"612"}</span>
                        <button className={"underline text-base md:text-lg inline text-[#509E82] border-0 mx-2"}>(show report)</button>
                        <br/>
                        <span className={" w-3/4 md:w-full break-normal flex justify-center text-md md:font-medium text-gray-400 text-left lg:leading-loose "}>This is a really good new phone,with big size and big storage,please use it!!!</span>
                    </p>
                </div>
            </div>
            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-6 md:mb-4 "}>

                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Brand</label>
                        <FormControl fullWidth focused={false} size={"small"}>
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
                        <FormControl fullWidth focused={false} size={"small"}>
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
                            Identification(New)</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                          <Select
                            labelId="identification-label"
                            id="identification"
                            value={device.identification}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                          >
                            <MenuItem value={"Current(30%)"}>Current (30%)</MenuItem>
                            <MenuItem value={"Current (70%)"}>Current (70%)</MenuItem>
                            <MenuItem value={"Current (90%)"}>Current (90%)</MenuItem>
                            <MenuItem value={"Rare (30%)"}>Rare (30%)</MenuItem>
                            <MenuItem value={"Rare (70%)"}>Rare (70%)</MenuItem>
                            <MenuItem value={"Rare (90%)"}>Rare (90%)</MenuItem>
                            <MenuItem value={"Recycle"}>Recycle</MenuItem>
                            <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Operating System</label>
                        <FormControl fullWidth focused={false} size={"small"}>
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
                        <FormControl fullWidth focused={false} size={"small"}>
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
                            Color</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                          <Select
                            labelId="color-label"
                            id="color"
                            value={device.color}
                            onChange={handleChange}
                            className={"border border-[#509E82] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}>
                            <MenuItem value={"olive"}>olive</MenuItem>
                            <MenuItem value={"black"}>black</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                </div>

                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Type</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                          <Select
                            labelId="type-label"
                            id="type"
                            value={device.type}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                          >
                            <MenuItem value={"Phone"}>Phone</MenuItem>
                            <MenuItem value={"Tablet"}>Tablet</MenuItem>
                            <MenuItem value={"Laptop"}>Laptop</MenuItem>

                          </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"} >*
                            Expected Value</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                          <Select
                            labelId="worth-label"
                            id="worth"
                            value={device.worth}
                            onChange={handleChange}
                            className={"border border-[#509E82] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}>
                            <MenuItem value={"612"} className={"flex"}>
                                <label>Cex</label>
                                <label className={"absolute right-8 inline text-[#509E82] "}>£512</label>
                            </MenuItem>
                            <MenuItem value={"582"} className={"flex"}>
                                <label>Cerweewwewqe</label>
                                <label className={"absolute right-8 inline text-[#509E82] "}>£582</label>
                            </MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                </div>

                <label className={"flex text-lg text-[#509E82] underline justify-center md:justify-end mr-5 mt-2 md:mt-0"}>Draft has saved!</label>
                <div className={"flex flex-col md:flex-row justify-end"}>
                    <button className={"w-full md:w-2/5 h-full mt-2 p-2 px-auto md:p-3 md:mr-10 cursor-pointer bg-[#509E82] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold md:mb-6"}>
                    Send QR Code
                    </button>
                    <br className={"md:hidden"}/>
                    <button className={"w-full md:w-1/5 h-full md:mt-2 p-2 px-auto md:p-3 cursor-pointer bg-[#509E82] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold md:mb-6"}>
                    Apply
                    </button>
                </div>
            </div>
        </div>
    );
}


