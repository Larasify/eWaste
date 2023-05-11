/**
 * Stripe Page
 * @version 1
 * @author [Hongyu Pan](https://git.shefcompsci.org.uk/acr21hp)
 *
 */

/* Module Imports
React library Components */
import React, {useEffect, useId, useRef, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {FaCcStripe} from "react-icons/fa";

import {Elements,CardElement,useStripe} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {Notify} from "../fragments/Notify";



export  default  function Stripe(){

    let navigate = useNavigate();
    const location = useLocation();
    let newPaymentId;
    let deviceId,newService,amount,description,payment_id;


    const stripePromise=loadStripe('pk_test_51N5FUWEPDlosnaW6Sbqw3RdjPn5oKWU6VfJNiAMC4z7BzgYBtVHOOf' +
        'CCuMFZOT7fh9IQ9YSQR4ewu6oKNR9O4ybr00xX9MIfUn')


    /* Update Device Payment after Paying */
    const [message, setMessage] = useState("");

        function updateService(){
                console.log("update")
                fetch('/device/updatedevice', {
                        method: 'POST',
                        credentials: "include",
                        headers: new Headers({"Content-Type": "application/json"}),
                        body: JSON.stringify({
                            id: deviceId,
                            fields:[{
                                service:newService
                            }],
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.response !== 'success') {
                             Notify.error('Something went wrong!');
                        }
                        // else console.log('update Service')
                    })
            }
        function addPayment() {
                console.log("add")
                if(newService==="wipe and further retrieve" && payment_id!==null){
                    fetch('/device/addpayment', {
                        method: 'POST',
                        credentials: "include",
                        headers: new Headers({"Content-Type": "application/json"}),
                        body: JSON.stringify({
                            id: deviceId,
                            payment_id: newPaymentId,
                            payment_amount:amount,
                            type:"extended/warraty/payment2",
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.response === 'success') {
                            Notify.success('Payment Successful!')
                            //navigate('/user-recycle');
                            console.log('add payment')
                            console.log(newPaymentId)
                            console.log(typeof newPaymentId)
                        }
                        else Notify.error('Something went wrong!');
                    })
                }
                else{
                    fetch('/device/addpayment', {
                        method: 'POST',
                        credentials: "include",
                        headers: new Headers({"Content-Type": "application/json"}),
                        body: JSON.stringify({
                            id: deviceId,
                            payment_id: newPaymentId,
                            payment_amount:amount,
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.response === 'success') {
                            Notify.success('Payment Successful!')
                            //navigate('/user-recycle');
                            console.log('add payment')
                        }
                        else Notify.error('Something went wrong!');
                    })
                }

            }

        /* Get the User Payment Information */
        useEffect(() => {
            if(location.state !== null){
                deviceId = location.state.deviceId;
                newService = location.state.newService;
                amount = location.state.amount;
                description = location.state.description;
                payment_id = location.state.hasOwnProperty(payment_id)?location.state.payment_id:null;

            }else{
                let paymentInfo = localStorage.getItem("paymentInfo")
                paymentInfo = JSON.parse(paymentInfo)
                deviceId = paymentInfo.state.deviceId;
                newService = paymentInfo.state.newService;
                amount = paymentInfo.state.amount;
                description = paymentInfo.state.description;
                payment_id = paymentInfo.state.payment_id;
                newPaymentId = paymentInfo.newPaymentId;
                console.log(payment_id)
                console.log(paymentInfo)
            }
            /* Check to see if this is a redirect back from Checkout */
            const query = new URLSearchParams(window.location.search);
            console.log(query)

            if (query.get("success")) {
                addPayment();
                updateService();
                navigate('/user-recycle');
                console.log('jump');
            }

            if (query.get("canceled")) {
                navigate('/user-recycle')
            }
        }, []);


        /* Handle the Checkout Information */
        const handleCheckout = async ()=>{
            console.log(newService)
            console.log(payment_id)
            const requestOptions = {
                method: "POST",
                redirect: 'follow',
                credentials: "include",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({
                    line_items:[{
                            price: (newService==="wipe and further retrieve"&& amount===23)?"price_1N5FyREPDlosnaW6qIK0oW8c":
                                (newService==="wipe and further retrieve"?"price_1N5FxtEPDlosnaW6BcD4trmZ":"price_1N5FwoEPDlosnaW63COtFbf4"),
                            quantity:1,
        }],
        }
                )
            }
            await fetch('/device/create-checkout-session', requestOptions).
                then(response => response.json())
                .then(data => {
                    if (data.response === 'success'){
                       newPaymentId = data.checkout_session.id;
                       localStorage.setItem("paymentInfo", JSON.stringify({
                           newPaymentId: newPaymentId,
                           state: location.state
                       }))
                    }
                    window.location.href = data.checkout_session.url;
            })
        }

        return(
        <div className={"flex flex-col md:w-1/2 h-1/2 mx-auto mt-12 md:border md:border-2 md:border-[#509E82] rounded-3xl"}>
            <FaCcStripe className={"text-2xl mx-auto  justify-center items-center mt-6"} size={40}/>
            <label className={"flex py-5 w-full text-lg md:text-3xl justify-center items-center font-bold "}>Pay with Stripe</label>

            <div className={" mx-auto justify-center items-center mb-12 mt-4"} >
                <button className={"rounded-full px-12 py-2 bg-[#509E82] text-white mx-auto  justify-center items-center text-lg md:text-2xl font-bold "}  onClick={handleCheckout}>Pay</button>

            </div>
        </div>
    )

}
