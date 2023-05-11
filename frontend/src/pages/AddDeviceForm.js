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
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:px-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-6 md:mb-4 "}>

                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
                            Brand</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"brandInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
                            Model Name</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"modelInput"}></input>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
                            Color</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"colorInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
                            Operating System</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"systemInput"}></input>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
                            Memory Storage</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"storageInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*value*/}
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "} >*
                            Expected Value</label>
                        <input
                            className={"block w-full p-2  text-gray-900 border border-[#509E82] border-2 rounded-md bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"valueInput"}></input>
                    </div>
                </div>

                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
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


                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
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
                     {/*status*/}
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "}>*
                            Status</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                          <Select
                            labelId="status-label"
                            id="status"
                            value={device.status}
                            onChange={handleChange}
                            className={"text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                          >
                            <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                            <MenuItem value={"Shipped"}>Shipped</MenuItem>
                            <MenuItem value={"Received"}>Received</MenuItem>
                            <MenuItem value={"Wiped"}>Wiped</MenuItem>
                            <MenuItem value={"Approved"}>Approved</MenuItem>
                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                            <MenuItem value={"Cancelled"}>Cancelled</MenuItem>

                          </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*verified*/}
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 "} >*
                            Verified</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                          <Select
                            labelId="verified-label"
                            id="verified"
                            value={device.verified}
                            onChange={handleChange}
                            className={"border border-[#509E82] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}>
                            <MenuItem value={"true"} className={"flex"}>True</MenuItem>
                            <MenuItem value={"false"} className={"flex"}>False</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                </div>

                {/*description*/}
                 <label className={" text-left block mb-2 text-xl font-medium text-gray-900 "} htmlFor={"descriptionInput"}>*
                            Description (No more than 500 words)</label>

                <textarea rows={"3"} className={" block w-full p-2 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                              type="text" id={"descriptionInput"}></textarea>

                {/*service*/}
                <div className="inline mt-4 md:grid md:grid-cols-2">
                    <div className={"flex items-center "}>
                        <input type="radio" id="wiping" name="service" value="wiping" className="h-4 w-4 md:h-5 md:w-5  "  required/>
                        <label htmlFor="wiping" className={"ml-2 text-left block text-xl font-medium text-gray-900 "}>Wipe Data from Device</label>
                    </div>
                    <br className={"md:hidden"}/>
                    <div className={"flex items-center "}>
                        <input type="radio" id="retrieval" name="service" value="retrieval" className="h-4 w-4 md:h-5 md:w-5 " required/>
                        <label  htmlFor="retrieval" className={"ml-2 text-left block text-xl font-medium text-gray-900 "}>Wipe & Retrieve Data from
                        Device</label>
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


