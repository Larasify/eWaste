import React from 'react';

import {FaCcStripe} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


// const device = {
//     props:{
//         brand: 'Apple',
//         model: 'Apple 13 Pro',
//         color:'Olive',
//         system:'Ios',
//         storage:'256G',
//         degree:'30%',
//     }
// };


export default function AddDeviceForm(){
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
                     className={"w-2/3 m-auto rounded-2xl border-[#3fb78c] border-2"}/>

            </div>
            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
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
                        {/*<FormControl fullWidth focused={false} size={"small"}>*/}
                        {/*  <Select*/}
                        {/*    labelId="model-label"*/}
                        {/*    id="model"*/}
                        {/*    value={device.model}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}*/}

                        {/*  >*/}
                        {/*    <MenuItem value={"Apple12Pro"}>Apple12Pro</MenuItem>*/}
                        {/*    <MenuItem value={"Apple13Pro"}>Apple13Pro</MenuItem>*/}
                        {/*    <MenuItem value={"AppleX"}>AppleX</MenuItem>*/}
                        {/*  </Select>*/}
                        {/*</FormControl>*/
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"modelInput"}></input>}
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Color</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"colorInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Operating System</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"systemInput"}></input>
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
                            <MenuItem value={"Laptop"}>Laptop</MenuItem>
                            <MenuItem value={"Phone"}>Phone</MenuItem>
                            <MenuItem value={"Tablet"}>Tablet</MenuItem>
                          </Select>
                        </FormControl>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Identification</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                          <Select
                            labelId="identification-label"
                            id="identification"
                            value={device.identification}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                          >
                            <MenuItem value={"Current"}>Current</MenuItem>
                            <MenuItem value={"Recycle"}>Recycle</MenuItem>
                            <MenuItem value={"Rare"}>Rare</MenuItem>
                            <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
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


