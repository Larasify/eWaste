/**
 * Payment Page
 * @version 1
 * @author [Hongyu Pan](https://git.shefcompsci.org.uk/acr21hp)
 *
 */
/* Module Imports
React library Components */
import React from 'react';
import {BsFillCheckCircleFill, BsPaypal} from "react-icons/bs";
import {FaCcStripe} from "react-icons/fa";
import {useNavigate,useLocation} from "react-router-dom";

/* Local imports */
import './Payment.css';
import {Notify} from "../fragments/Notify";


export default function Payment(){
    let navigate = useNavigate();

    /* Handle the Payment login and navigate to different pages */
    const handlePay = () =>{
        if(document.getElementById("paypalRadio").checked){
            navigate('/payment-paypal',{state:{deviceId,newService,amount,description}})
        }
        else if (document.getElementById("stripeRadio").checked){
            navigate('/payment-stripe',{state:{deviceId,newService,amount,description}})
        }
        else Notify.error('Please choose a payment method!')
    }

    /* Justify the service type */
    let serviceName = '';
    let description = '';
    const location = useLocation();
    const {deviceId,newService,amount} = location.state;
    if(newService === 'wipe and retrieve') {
        serviceName = 'Retrieve the Data';
        description = 'A secure link will show in your recycle page (valid for 3 months, then deleted)';
    }
    else if(newService === 'wipe and further retrieve'){
        serviceName = 'Extend Retrieval';
        description = 'A secure link will show in your recycle page for a extend time (3-6 months for retrieving data, then deleted)';
    }


    return(
        <div >

        <div className={"flex flex-col w-full md:w-5/6 md:mx-auto h-full md:h-5/6 bg-[#ECF4F1] md:rounded-3xl md:mt-12"} >
            <div>
                <span className={"flex justify-center w-full pt-8 text-3xl md:text-4xl pb-4 text-[#509E82] lg:pt-14 lg:font-semibold md:pt-10 md:font-semibold md:text-5xl lg:text-6xl"}>
                    Confirm Payment
                </span>
                <div className={"flex flex-col justify-center w-2/3 pt-6  mx-auto grid gap-4 md:w-5/6 md:pt-8 md:gap-6"}>
                    <p className={"text-xl md:text-3xl px-4"}>
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Service:</span>
                        {serviceName}
                    </p>
                    <p className={"text-xl md:text-3xl px-4"}>
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Description:</span>{description}
                    </p>
                    <p className={"text-xl md:text-3xl px-4"}>
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Fee:</span>
                        <p className={"inline text-[#509E82] font-semibold text-3xl md:text-5xl md:font-medium"}>£{amount}</p>
                    </p>
                    <div className={"inline mt-6 space-x-6 flex flex-row px-4" }  >
                        <span className={"font-semibold text-2xl pr-8 md:text-4xl"}>Payments:</span>
                            <div className="flex items-center md:gap-x-10">
                                <input className="h-6 w-6 border-gray-300 focus:ring-indigo-600" type="radio" name="payment" id="paypalRadio"></input>
                                <label for="paypalRadio" className='block leading-6'><BsPaypal size={40}/></label>
                            </div>
                            <div className={"flex items-center md:gap-x-10 "}>
                                <input className="h-6 w-6 border-gray-300 focus:ring-indigo-600" type="radio" name="payment" id="stripeRadio"></input>
                                <label for="stripeRadio" className='block leading-6'><FaCcStripe size={40}/></label>

                            </div>

                    </div>
                </div>

            </div>
            <button className={"flex justify-center items-center px-4 md:px-2 py-3 text-3xl font-medium mt-16 mb-20 bg-[#509E82] text-xl rounded-2xl md:text-2xl md:rounded-full w-1/5 mx-auto text-white font-medium md:font-bold hover:bg-[#4E8E77] "} onClick={handlePay}>Pay</button>


        </div>
            </div>
    )

}


