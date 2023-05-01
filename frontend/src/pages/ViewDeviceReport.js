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


export default function ViewDeviceReport(){
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
                        className={"text-base md:text-2xl lg:text-3xl text-black text-left font-bold lg:leading-10"}>iPhone 13</span>
                        <br/>
                        <span
                            className={"text-base md:text-lg lg:text-xl text-[#494949] text-left "}>Apple</span>
                        <br className={"md:hidden"}/>
                        <span
                            className={"md:text-lg lg:text-xl text-white font-bold rounded-full text-left bg-[#509E82] p-3 lg:ml-40"}>Current</span>
                        <br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Brand: Apple</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Model: iPhone 13 Pro</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Color: Black</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left "}>Type: Phone</span><br/>
                        <span className={" text-base md:text-lg text-gray-400 text-left"}>Memory Storage: 256G</span><br/>
                        <span className={"md:w-full break-normal flex justify-center text-md md:font-medium text-gray-400 text-left lg:leading-loose "}>This is a really good new phone,with big size and big storage,please use it!!!</span>


                         </p>
                </div>
            </div>
            <div className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"flex flex-col space-y-5 mt-6 md:mb-4 w-2/3 h-full"}>
                    <div className={"lg:grid lg:grid-cols-3"}>
                        <label className={"text-left font-bold  mb-2 text-2xl text-gray-900 dark:text-white"}>Payment:</label>
                        <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] dark:text-white"}>£294</label>
                    </div>
                    <div className={"lg:grid lg:grid-cols-3"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 dark:text-white"}>Referral:</label>
                       <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] dark:text-white"}>£13</label>
                    </div>
                    <div className={"lg:grid lg:grid-cols-3"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 dark:text-white"}>Status:</label>
                       <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] dark:text-white"}>Transferring</label>
                    </div>
                    <div className= {"lg:grid lg:grid-cols-3"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 dark:text-white"}>Service:</label>
                       <label className={"inline ml-2 mb-2 text-2xl font-medium text-[#509E82] dark:text-white"}>Data Wiping</label>
                    </div>
                    <div className= {"lg:grid lg:grid-cols-4"}>
                       <label className={"text-left font-bold mb-2 text-2xl text-gray-900 dark:text-white"}>QR Code:</label>
                       <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 m-auto "}/>
                    </div>
                    <div className={"flex flex-col md:flex-row justify-end"}>
                    <button className={"w-full md:w-2/5 h-full mt-12 p-2 px-auto md:p-3 md:mr-10 cursor-pointer bg-[#509E82] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold md:mb-6"}>
                    Send Link
                    </button>

                </div>

                </div>


            </div>
        </div>
    );
}


