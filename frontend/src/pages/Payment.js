import React from 'react';
import {BsFillCheckCircleFill, BsPaypal} from "react-icons/bs";
import {FaCcStripe} from "react-icons/fa";
import './Payment.css';
import {useNavigate} from "react-router-dom";


export default function Payment(){
    let navigate = useNavigate();
    const paySuc = () =>{
      navigate(`/paysuc`);
    }



    return(
        <div >
         {/*<div className={"suc-container"} style={{position: "absolute", zIndex: "2"}}>*/}
         {/*   <div className='success' style={{position: "relative"}}>*/}
         {/*        <BsFillCheckCircleFill size={150}*/}
         {/*                               style={{backgroundColor: "white", borderRadius: 100, border: "none"}}/>*/}
         {/*        <p style={{marginTop: "0.5em", color: "white"}}>Successful!</p>*/}
         {/*    </div>*/}
         {/*</div>*/}
        <div className={"flex flex-col w-full md:w-5/6 md:mx-auto h-full md:h-5/6 bg-[#ECF4F1] md:rounded-3xl md:mt-12"} >
            <div >
                <span className={"flex justify-center w-full pt-8 text-3xl md:text-4xl pb-4 text-[#509E82] lg:pt-14 lg:font-semibold md:pt-10 md:font-semibold md:text-5xl lg:text-6xl"}>
                    Confirm Payment
                </span>
                <div className={"flex flex-col justify-center w-2/3 pt-6 px-4 mx-auto grid gap-4 md:w-5/6 md:pt-8 md:gap-6"}>
                    <p className={"text-xl md:text-3xl "}>
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Service:</span>
                         Extend Retrieval
                    </p>
                    <p className={"text-xl md:text-3xl "}>
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Description:</span>
                        A secure link will be emailed to you for a extend time (3-6 months for retrieving data, then deleted)
                    </p>
                    <p className={"text-xl md:text-3xl"}>
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Fee:</span>
                        <p className={"inline text-[#509E82] font-semibold text-3xl md:text-5xl md:font-medium"}>£20</p>
                    </p>
                    <div className={"inline mt-6 space-x-6 flex flex-row" }  >
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Payments:</span>
                            <div className="flex items-center gap-x-10">
                                <input className="h-6 w-6 border-gray-300 focus:ring-indigo-600" type="radio" name="flexRadio" id="flexRadioPaypal"></input>
                                <label for="flexRadioPaypal" className='block leading-6'><BsPaypal size={50}/></label>
                            </div>
                            <div className={"flex items-center gap-x-10"}>
                                <input className="h-6 w-6 border-gray-300 focus:ring-indigo-600" type="radio" name="flexRadio" id="flexRadioStripe"></input>
                                <label for="flexRadioStripe" className='block leading-6'><FaCcStripe size={50}/></label>

                            </div>

                    </div>
                </div>

            </div>
            <button className={"flex justify-center items-center px-4 md:px-2 py-3 text-3xl font-medium mt-16 mb-20 bg-[#509E82] text-xl md:text-2xl rounded-full w-1/5 mx-auto text-white font-medium md:font-bold hover:bg-[#4E8E77] "} onClick={paySuc}>Pay</button>


        </div>
            </div>
    )

}


