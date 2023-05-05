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


export default function EditTransactionForm(){
    let navigate = useNavigate();

    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };


    const [transaction, setTransaction] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };

  console.log(transaction);

    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl bg-[#E3F0EB]"}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-8 items-center text-[#509E82]"}
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
                        <span className={"w-full break-normal flex justify-center text-md md:font-medium text-gray-400 text-left lg:leading-loose "}>This is a really good new phone,with big size and big storage,please use it!!!</span>
                    </p>
                </div>
            </div>
            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-16 md:mb-4 "}>

                    {/*amount*/}
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Amount</label>
                        <input
                            className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"amountInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*status*/}
                     <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Status</label>
                        <input
                            className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"statusInput"}></input>
                    </div>

                </div>


                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-10 md:mb-4 "}>
                    <div >
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"} >*
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
                    <br className={"block md:hidden"}/>
                    <div >
                         <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            QR Code Link</label>
                        <label
                            className={" block w-full p-2 md:p-3  rounded-lg  sm:text-md  underline text-[#509E82]"}
                            >Generate by clicking button</label>
                    </div>
                    {/*verified*/}

                </div>


                <label className={"flex text-lg text-[#509E82] underline justify-center md:justify-end mr-5 mt-4 md:mt-16"}>Draft has saved!</label>
                <div className={"flex flex-col md:flex-row justify-end"}>
                    <button className={"w-full md:w-2/5 h-full mt-2 p-2 px-auto md:p-3 md:mr-10 cursor-pointer bg-[#509E82] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold md:mb-6"}>
                    Generate Link
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


